import { ConsoleLogWriter } from "drizzle-orm";
import { readConfig } from "src/config";
import {
	createFeed,
	createFeedFollow,
	getFeedData,
	getFeedFollowsForUser,
	showFeeds,
	deleteFeedFollow,
} from "src/lib/db/queries/rss";
import { getUser } from "src/lib/db/queries/users";
import { feeds, users } from "src/lib/db/schema";

export type Feed = typeof feeds.$inferSelect; // feeds is the table object in schema.ts
export type User = typeof users.$inferSelect; // feeds is the table object in schema.ts

function printFeed(feed: Feed, user: User) {
	for (const k in feed) {
		const key = k as keyof Feed;
		console.log(`${k}: ${feed[key]}`);
	}
	for (const k in user) {
		const key = k as keyof User;
		console.log(`${k}: ${user[key]}`);
	}
}
export async function handlerAddFeed(
	cmdName: string,
	user: User,
	...args: string[]
) {
	console.log("Add Feed");
	if (args.length !== 2) {
		throw new Error(`usage: ${cmdName} <name> <url>`);
	}
	const result = await createFeed(args[0], args[1]);
	await createFeedFollow(user.id, result.id);
	printFeed(result, user);
}

export async function handlerFeeds(_: string) {
	const config = readConfig();
	const user = await getUser(config.currentUserName);

	if (!user) {
		throw new Error(`User ${config.currentUserName} not found`);
	}
	const result = await showFeeds();

	for (const r of result) {
		console.log(`feedName: ${r.feeds.name}`);
		console.log(`feedURL: ${r.feeds.url}`);
		console.log(`createdBy: ${r.users?.name}`);
	}
}

export async function handlerFollow(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (args.length !== 1) {
		throw new Error(`usage: ${cmdName} <url>`);
	}
	const feedObj = await getFeedData(args[0]);
	const result = await createFeedFollow(user.id, feedObj.id);
	console.log(`${result.userName} has followed ${result.feedName}`);
}

export async function handlerFollowing(_: string, user: User) {
	const result = await getFeedFollowsForUser(user.name);
	console.log(result);
	for (let feed of result) {
		console.log(feed.feedName);
	}
}

export async function handlerUnfollow(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (args.length !== 1) {
		throw new Error(`usage: ${cmdName} <feed_url>`);
	}

	const feed = await getFeedData(args[0]);
	console.log(`Unfollowing: ${args[0]}`);

	const result = await deleteFeedFollow(user.id, feed.id);
	if (!result) {
		throw new Error(`failed to unfollow feed: ${feed.url}`);
	}
	console.log(`Unfollowed ${feed.name}`);
}
