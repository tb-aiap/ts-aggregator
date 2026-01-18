ALTER TABLE "feed_follows" DROP CONSTRAINT "custom_fk";
--> statement-breakpoint
ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "custom_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;