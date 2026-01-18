import { resetDb } from "src/lib/db/queries/reset";
import { fetchFeed } from "src/lib/rss";

export async function handlerReset(cmdName: string, ...args: string[]) {
	if (args.length !== 0) {
		throw new Error(`usage: ${cmdName}`);
	}
	await resetDb();
}

export async function handlerAgg(_: string) {
	console.log("agg handler");
	const url = "https://www.wagslane.dev/index.xml";
	const feedData = await fetchFeed(url);
	const feedDataStr = JSON.stringify(feedData, null, 2);
	console.log(feedDataStr);
}
