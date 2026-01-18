import { db } from "..";
import { feeds, users, feedFollows } from "../schema";
import { readConfig } from "src/config";
import { getUser } from "./users";
import { eq, and } from "drizzle-orm";

export async function createFeed(name: string, url: string) {
	const config = readConfig();
	const currentUser = config.currentUserName;
	const user = await getUser(currentUser);

	const [result] = await db
		.insert(feeds)
		.values({
			name: name,
			url: url,
			user_id: user.id,
		})
		.returning();

	return result;
}

export async function showFeeds() {
	const result = await db
		.select()
		.from(feeds)
		.leftJoin(users, eq(feeds.user_id, users.id));
	// console.log(result);
	return result;
}

export async function getFeedData(url: string) {
	const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
	return result;
}

export async function createFeedFollow(userId: string, feedId: string) {
	const [newFeedFollow] = await db
		.insert(feedFollows)
		.values({
			userId: userId,
			feedId: feedId,
		})
		.returning();

	const [result] = await db
		.select({
			id: feedFollows.id,
			userId: feedFollows.userId,
			createdAt: feedFollows.createdAt,
			updatedAt: feedFollows.updatedAt,
			feedId: feedFollows.feedId,
			userName: users.name,
			feedName: feeds.name,
		})
		.from(feedFollows)
		.where(eq(feedFollows.id, newFeedFollow.id))
		.innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
		.innerJoin(users, eq(feedFollows.userId, users.id));
	return result;
}

export async function getFeedFollowsForUser(userName: string) {
	const userDetails = await getUser(userName);
	const result = await db
		.select({
			feedName: feeds.name,
			userName: users.name,
			id: feedFollows.id,
			userId: feedFollows.userId,
			createdAt: feedFollows.createdAt,
			updatedAt: feedFollows.updatedAt,
			feedId: feedFollows.feedId,
		})
		.from(feedFollows)
		.leftJoin(users, eq(feedFollows.userId, users.id))
		.leftJoin(feeds, eq(feedFollows.feedId, feeds.id))
		.where(eq(feedFollows.userId, userDetails.id));
	return result;
}

export async function deleteFeedFollow(userId: string, feedId: string) {
	const [result] = await db
		.delete(feedFollows)
		.where(and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feedId)))
		.returning();

	return result;
}

// export async function markFeedFetched(feedId: string) {
// 	const [result] = await db
// 		.update(feeds)
// 		.set({
// 			lastFetchedAt: new Date(),
// 		})
// 		.where(eq(feeds.id, feedId))
// 		.returning();

// 	return result;
// }
