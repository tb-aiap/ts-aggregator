import { setUser, readConfig } from "../config";
import { createUser, getUser, getUsers } from "src/lib/db/queries/users";
import { User } from "./feeds";

/**
 * Commands for managing users (login/register/list) used by the CLI.
 *
 * This module exposes handlers that validate arguments, interact with the
 * database via `src/lib/db/queries/users`, and update local configuration
 * via `setUser`/`readConfig`.
 */

export type UserCommandHandler = (
	cmdName: string,
	user: User,
	...args: string[]
) => Promise<void>;

/**
 * Handle the `login` command.
 *
 * Expects a single argument: the user name to switch to. If the user exists
 * in the database, updates the local config to make them the current user.
 *
 * @param cmdName - The invoked command name (used in usage message).
 * @param args - Should contain exactly one element: the user name.
 * @throws If the argument count is incorrect or the user is not registered.
 */
export async function handlerLogin(cmdName: string, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error(`usage: ${cmdName} <name>`);
	}

	const c = await checkUserInDB(args[0]);
	if (!c) {
		throw new Error("User not registered");
	}
	setUser(args[0]);
	console.log("User switched successfully.");
}

/**
 * Handle the `register` command.
 *
 * Expects a single argument: the new user's name. If the user does not
 * already exist, creates the user in the database and sets them as the
 * current user in the local config.
 *
 * @param cmdName - The invoked command name (used in usage message).
 * @param args - Should contain exactly one element: the new user name.
 * @throws If the argument count is incorrect or the user already exists.
 */
export async function handlerRegister(cmdName: string, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error(`usage: ${cmdName} <name>`);
	}
	const c = await checkUserInDB(args[0]);
	if (c) {
		throw new Error("User already exist!");
	}
	console.log("user not exist, registering");
	const u = await createUser(args[0]);
	console.log(`Setting user ${u.name}`);
	setUser(u.name);
}

/**
 * Handle the `users` command.
 *
 * Lists all registered users and marks the currently active user.
 * Expects no arguments.
 *
 * @param cmdName - The invoked command name (used in usage message).
 * @param args - Should be empty for this command.
 * @throws If any arguments are provided.
 */
export async function handlerUsers(cmdName: string, ...args: string[]) {
	if (args.length !== 0) {
		throw new Error(`usage: ${cmdName} <no args>`);
	}

	const users = await getUsers();
	const config = readConfig();
	const currentUser = config.currentUserName;

	for (const user of users) {
		if (user.name === currentUser) {
			console.log(user.name + " (current)");
		} else {
			console.log(user.name);
		}
	}
}

/**
 * Check whether a user exists in the database.
 *
 * @param userName - The name of the user to check.
 * @returns `true` if the user exists, otherwise `false`.
 */
async function checkUserInDB(userName: string): Promise<boolean> {
	console.log(`checking if ${userName} exist`);
	const p = await getUser(userName);
	return p !== undefined;
}
