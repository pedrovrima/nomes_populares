CREATE TABLE IF NOT EXISTS "popular" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"region" text,
	"source_name" text,
	"collector" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"scientific_name" text,
	"brName" text,
	"enName" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";