ALTER TABLE "feed_follows" RENAME TO "feedFollows";--> statement-breakpoint
ALTER TABLE "feedFollows" DROP CONSTRAINT "user_feed_pair";--> statement-breakpoint
ALTER TABLE "feedFollows" DROP CONSTRAINT "custom_fk";
--> statement-breakpoint
ALTER TABLE "feedFollows" DROP CONSTRAINT "feed_follows_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "feedFollows" ADD CONSTRAINT "feedFollows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedFollows" ADD CONSTRAINT "feedFollows_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedFollows" ADD CONSTRAINT "feedFollows_user_id_feed_id_unique" UNIQUE("user_id","feed_id");