CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"phone" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
