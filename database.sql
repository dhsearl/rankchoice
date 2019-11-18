
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- CREATE DATABASE rankchoice_io  
-- See pool.js file
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "voter_identity" VARCHAR(255),
);

CREATE TABLE "voters" (
  "id" SERIAL PRIMARY KEY,
  "voter_identity" VARCHAR(255),
  "created_at" timestamp
);

CREATE TABLE "polls" (
  "id" SERIAL PRIMARY KEY,
  "url_path" varchar,
  "type" varchar,
  "question" varchar,
  "winning_candidate" int,
  "created_at" timestamp,
  "collection_period" boolean,
  "voting_period" boolean,
  "complete" boolean
);

CREATE TABLE "candidate_ideas" (
  "id" SERIAL PRIMARY KEY,
  "poll_id" int,
  "description" varchar,
  "created_at" timestamp,
  "created_by" int
);

CREATE TABLE "vote_instance" (
  "id" SERIAL PRIMARY KEY,
  "poll_id" int,
  "voter_id" int,
  "created_at" timestamp
);

CREATE TABLE "single_vote" (
  "id" SERIAL PRIMARY KEY,
  "vote_instance_id" int,
  "candidate_id" int,
  "rank_integer" int
);


ALTER TABLE "candidate_ideas" ADD FOREIGN KEY ("created_by") REFERENCES "voters";

ALTER TABLE "candidate_ideas" ADD FOREIGN KEY ("poll_id") REFERENCES "polls";

ALTER TABLE "single_vote" ADD FOREIGN KEY ("candidate_id") REFERENCES "candidate_ideas";

ALTER TABLE "vote_instance" ADD FOREIGN KEY ("voter_id") REFERENCES  "voters";

ALTER TABLE "vote_instance" ADD FOREIGN KEY ("poll_id") REFERENCES "polls";

ALTER TABLE "single_vote" ADD FOREIGN KEY ("vote_instance_id") REFERENCES "vote_instance";

ALTER TABLE "polls" ADD FOREIGN KEY ("winning_candidate") REFERENCES "candidate_ideas";