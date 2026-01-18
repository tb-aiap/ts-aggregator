import { type CommandsRegistry } from "./commands/command";
import { registerCommand } from "./commands/command";
import { runCommand } from "./commands/command";
import { handlerLogin, handlerRegister, handlerUsers } from "./commands/users";
import { handlerReset } from "./commands/reset";
import { handlerAgg } from "./commands/rss";
import {
	handlerAddFeed,
	handlerFeeds,
	handlerFollow,
	handlerFollowing,
	handlerUnfollow,
} from "./commands/feeds";
import { middlewareLoggedIn } from "./middleware";

async function main() {
	const registry: CommandsRegistry = {};
	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "reset", handlerReset);
	registerCommand(registry, "users", handlerUsers);
	registerCommand(registry, "agg", handlerAgg);
	registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
	registerCommand(registry, "feeds", handlerFeeds);
	registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
	registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
	registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));

	const cmd = process.argv.slice(2)[0];
	if (cmd.length === 0) {
		console.log(`cmd - at least 1 command`);
		process.exit(1);
	}

	if (!(cmd in registry)) {
		console.log(`${cmd} is not implemented`);
		process.exit(1);
	}

	const args = process.argv.slice(3);

	await runCommand(registry, cmd, ...args);

	process.exit(0);
}
await main();
