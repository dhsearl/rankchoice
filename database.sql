
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
    "voter_identity" VARCHAR(255)
);

CREATE TABLE "voters" (
  "id" SERIAL PRIMARY KEY,
  "voter_identity" VARCHAR(255),
  "created_at" timestamp
);

SET TIMEZONE='utc';

CREATE TABLE "polls" (
  "id" SERIAL PRIMARY KEY,
  "url" varchar,
  "type" varchar,
  "question" varchar,
  "winning_candidate" int DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "collection_period" boolean,
  "voting_period" boolean,
  "complete" boolean
);


CREATE TABLE "candidate_ideas" (
  "id" SERIAL PRIMARY KEY,
  "poll_id" int,
  "idea_text" varchar,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar
);

CREATE TABLE "vote_instance" (
  "id" SERIAL PRIMARY KEY,
  "poll_id" int,
  "voter_id" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "last_vote" boolean default true
);

CREATE TABLE "single_vote" (
  "id" SERIAL PRIMARY KEY,
  "vote_instance_id" int,
  "candidate_id" int,
  "rank_integer" int
);
CREATE TABLE "text_voter" (
	"id" SERIAL PRIMARY KEY,
	"poll_id" int,
	"phone_number" varchar(255)
);

ALTER TABLE "candidate_ideas" ADD FOREIGN KEY ("poll_id") REFERENCES "polls";
ALTER TABLE "single_vote" ADD FOREIGN KEY ("candidate_id") REFERENCES "candidate_ideas";
ALTER TABLE "vote_instance" ADD FOREIGN KEY ("poll_id") REFERENCES "polls";
ALTER TABLE "single_vote" ADD FOREIGN KEY ("vote_instance_id") REFERENCES "vote_instance";
ALTER TABLE "polls" ADD FOREIGN KEY ("winning_candidate") REFERENCES "candidate_ideas";

INSERT INTO polls(
  "url",
  "type",
  "question",
  "winning_candidate",
  "collection_period",
  "voting_period",
  "complete")VALUES(NULL,NULL,'This is to catch bad polls',NULL,FALSE,FALSE,FALSE);

INSERT INTO candidate_ideas("poll_id","idea_text")VALUES(1,'No Winner Found - Did you vote?');