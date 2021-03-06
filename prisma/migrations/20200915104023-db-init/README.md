# Migration `20200915104023-db-init`

This migration has been generated by Stefan N at 9/15/2020, 12:40:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Role" AS ENUM ('User', 'Admin', 'Student', 'Teacher', 'Principal')

CREATE TYPE "public"."Gender" AS ENUM ('Unkown', 'Male', 'Female', 'Other')

CREATE TYPE "public"."BallotScope" AS ENUM ('Public', 'National', 'Cantonal', 'School', 'Team')

CREATE TYPE "public"."VotingStatus" AS ENUM ('Restricted', 'Open', 'Voted', 'NotStarted', 'Closed')

CREATE TABLE "public"."accounts" (
"id" SERIAL,
"compound_id" text   NOT NULL ,
"user_id" integer   NOT NULL ,
"provider_type" text   NOT NULL ,
"provider_id" text   NOT NULL ,
"provider_account_id" text   NOT NULL ,
"refresh_token" text   ,
"access_token" text   ,
"access_token_expires" timestamp(3)   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."sessions" (
"id" SERIAL,
"user_id" integer   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
"session_token" text   NOT NULL ,
"access_token" text   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."users" (
"id" SERIAL,
"name" text   ,
"email" text   ,
"email_verified" timestamp(3)   ,
"verified" boolean   DEFAULT false,
"lastname" text   ,
"image" text   ,
"password" text   ,
"gender" "Gender"  NOT NULL DEFAULT E'Unkown',
"year" integer   ,
"role" "Role"  NOT NULL DEFAULT E'Student',
"school_id" integer   ,
"team_id" integer   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."verification_requests" (
"id" SERIAL,
"identifier" text   NOT NULL ,
"token" text   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."teams" (
"id" SERIAL,
"name" text   NOT NULL ,
"invite" text   ,
"year" integer   ,
"school_id" integer   NOT NULL ,
"team_id" integer   NOT NULL ,
"domain_id" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."schools" (
"id" SERIAL,
"name" text   NOT NULL ,
"city" text   NOT NULL DEFAULT E'',
"canton" text   NOT NULL DEFAULT E'',
"zip" text   NOT NULL DEFAULT E'',
"address" text   NOT NULL DEFAULT E'',
"domain_id" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."domains" (
"id" SERIAL,
"name" text   NOT NULL ,
"approved" boolean   NOT NULL DEFAULT false,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."ballots" (
"id" SERIAL,
"title" text   NOT NULL ,
"description" text   NOT NULL ,
"body" text   NOT NULL ,
"start" timestamp(3)   NOT NULL ,
"end" timestamp(3)   NOT NULL ,
"scope" "BallotScope"  NOT NULL DEFAULT E'Public',
"canton" text   ,
"school_id" integer   ,
"team_id" integer   ,
"creator_id" integer   ,
"thread_id" integer   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."options" (
"id" SERIAL,
"vote" integer   NOT NULL ,
"title" text   NOT NULL ,
"ballot_id" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."voted" (
"id" SERIAL,
"signature" text   ,
"user_id" integer   NOT NULL ,
"ballot_id" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."votes" (
"id" SERIAL,
"vote" integer   NOT NULL ,
"verify" text   ,
"ballot_id" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."attachments" (
"id" SERIAL,
"file" text   NOT NULL ,
"title" text   NOT NULL DEFAULT E'',
"user_id" integer   NOT NULL ,
"ballot_id" integer   ,
"thread_id" integer   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."threads" (
"id" SERIAL,
"title" text   NOT NULL DEFAULT E'',
"text" text   NOT NULL DEFAULT E'',
"ref" text   ,
"user_id" integer   NOT NULL ,
"parent_id" integer   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."reactions" (
"id" SERIAL,
"emoij" text   NOT NULL ,
"user_id" integer   NOT NULL ,
"thread_id" integer   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "public"."accounts"("compound_id")

CREATE INDEX "providerAccountId" ON "public"."accounts"("provider_account_id")

CREATE INDEX "providerId" ON "public"."accounts"("provider_id")

CREATE INDEX "userId" ON "public"."accounts"("user_id")

CREATE UNIQUE INDEX "sessions.session_token_unique" ON "public"."sessions"("session_token")

CREATE UNIQUE INDEX "sessions.access_token_unique" ON "public"."sessions"("access_token")

CREATE UNIQUE INDEX "users.email_unique" ON "public"."users"("email")

CREATE UNIQUE INDEX "verification_requests.token_unique" ON "public"."verification_requests"("token")

CREATE UNIQUE INDEX "teams.invite_unique" ON "public"."teams"("invite")

CREATE UNIQUE INDEX "domains.name_unique" ON "public"."domains"("name")

CREATE UNIQUE INDEX "ballots_thread_id_unique" ON "public"."ballots"("thread_id")

ALTER TABLE "public"."users" ADD FOREIGN KEY ("school_id")REFERENCES "public"."schools"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("team_id")REFERENCES "public"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("team_id")REFERENCES "public"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."teams" ADD FOREIGN KEY ("school_id")REFERENCES "public"."schools"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."teams" ADD FOREIGN KEY ("team_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."teams" ADD FOREIGN KEY ("domain_id")REFERENCES "public"."domains"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."schools" ADD FOREIGN KEY ("domain_id")REFERENCES "public"."domains"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."ballots" ADD FOREIGN KEY ("school_id")REFERENCES "public"."schools"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."ballots" ADD FOREIGN KEY ("team_id")REFERENCES "public"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."ballots" ADD FOREIGN KEY ("creator_id")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."ballots" ADD FOREIGN KEY ("thread_id")REFERENCES "public"."threads"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."options" ADD FOREIGN KEY ("ballot_id")REFERENCES "public"."ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."voted" ADD FOREIGN KEY ("user_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."voted" ADD FOREIGN KEY ("ballot_id")REFERENCES "public"."ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."votes" ADD FOREIGN KEY ("ballot_id")REFERENCES "public"."ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."attachments" ADD FOREIGN KEY ("user_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."attachments" ADD FOREIGN KEY ("ballot_id")REFERENCES "public"."ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."attachments" ADD FOREIGN KEY ("thread_id")REFERENCES "public"."threads"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."threads" ADD FOREIGN KEY ("user_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."threads" ADD FOREIGN KEY ("parent_id")REFERENCES "public"."threads"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."reactions" ADD FOREIGN KEY ("user_id")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."reactions" ADD FOREIGN KEY ("thread_id")REFERENCES "public"."threads"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200915104023-db-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,277 @@
+datasource db {
+  provider = "postgres"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Account {
+  id                 Int       @default(autoincrement()) @id
+  compoundId         String    @unique @map(name: "compound_id")
+  userId             Int       @map(name: "user_id")
+  providerType       String    @map(name: "provider_type")
+  providerId         String    @map(name: "provider_id")
+  providerAccountId  String    @map(name: "provider_account_id")
+  refreshToken       String?   @map(name: "refresh_token")
+  accessToken        String?   @map(name: "access_token")
+  accessTokenExpires DateTime? @map(name: "access_token_expires")
+  createdAt          DateTime  @default(now()) @map(name: "created_at")
+  updatedAt          DateTime  @default(now()) @map(name: "updated_at")
+
+  @@index([providerAccountId], name: "providerAccountId")
+  @@index([providerId], name: "providerId")
+  @@index([userId], name: "userId")
+
+  @@map(name: "accounts")
+}
+
+model Session {
+  id           Int      @default(autoincrement()) @id
+  userId       Int      @map(name: "user_id")
+  expires      DateTime
+  sessionToken String   @unique @map(name: "session_token")
+  accessToken  String   @unique @map(name: "access_token")
+  createdAt    DateTime @default(now()) @map(name: "created_at")
+  updatedAt    DateTime @default(now()) @map(name: "updated_at")
+
+  @@map(name: "sessions")
+}
+
+enum Role {
+  User
+  Admin
+  Student
+  Teacher
+  Principal
+}
+
+enum Gender {
+  Unkown
+  Male
+  Female
+  Other
+}
+
+model User {
+  id            Int       @default(autoincrement()) @id
+  name          String?
+  email         String?   @unique
+  emailVerified DateTime? @map(name: "email_verified")
+  verified      Boolean?  @default(false)
+  lastname      String?
+  image         String?
+
+  password String?
+  gender   Gender  @default(Unkown)
+  year     Int? // year born
+
+  role     Role    @default(Student)
+  school   School? @relation(fields: [schoolId], references: [id])
+  team     Team?   @relation(fields: [teamId], references: [id])
+  teaches  Team[]  @relation("Teacher")
+  schoolId Int?    @map(name: "school_id")
+  teamId   Int?    @map(name: "team_id")
+
+  ballots     Ballot[]
+  attachments Attachment[]
+  threads     Thread[]
+  reactions   Reaction[]
+  voted       Voted[]      @relation("VotedUser")
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "users")
+  Team Team? @relation("TeamMembers", fields: [teamId], references: [id])
+}
+
+model VerificationRequest {
+  id         Int      @default(autoincrement()) @id
+  identifier String
+  token      String   @unique
+  expires    DateTime
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "verification_requests")
+}
+
+model Team {
+  id     Int     @default(autoincrement()) @id
+  name   String
+  invite String? @unique
+  year   Int? // in what year (roughly) were kids born (now - schoolyear - 5y)
+
+  school    School   @relation(fields: [schoolId], references: [id])
+  schoolId  Int      @map(name: "school_id")
+  teacher   User     @relation(name: "Teacher", fields: [teacherId], references: [id])
+  teacherId Int      @map(name: "team_id")
+  members   User[]   @relation("TeamMembers")
+  ballots   Ballot[]
+  domain    Domain?  @relation(fields: [domainId], references: [id])
+  domainId  Int?     @map(name: "domain_id")
+
+  @@map(name: "teams")
+  User User[]
+}
+
+model School {
+  id      Int    @default(autoincrement()) @id
+  name    String
+  city    String @default("")
+  canton  String @default("")
+  zip     String @default("")
+  address String @default("")
+
+  domain   Domain?  @relation(fields: [domainId], references: [id])
+  domainId Int?     @map(name: "domain_id")
+  members  User[]
+  teams    Team[]
+  ballots  Ballot[]
+
+  @@map(name: "schools")
+}
+
+model Domain {
+  id       Int     @default(autoincrement()) @id
+  name     String  @unique
+  approved Boolean @default(false)
+
+  schools School[]
+  Team    Team[]
+
+  @@map(name: "domains")
+}
+
+enum BallotScope {
+  Public // Open ballot
+  National // Official national ballots
+  Cantonal // Official canontal ballots
+  School // School ballots
+  Team // class ballots
+}
+
+enum VotingStatus {
+  Restricted // User is not allowed to vote 
+  Open // User may vote
+  Voted // User has already voted
+  NotStarted // Ballot is not open yet
+  Closed // Ballot is already closed
+}
+
+model Ballot {
+  id          Int         @default(autoincrement()) @id
+  title       String
+  description String
+  body        String
+  start       DateTime
+  end         DateTime
+  scope       BallotScope @default(Public)
+  canton      String?
+
+  school    School? @relation(fields: [schoolId], references: [id])
+  schoolId  Int?    @map(name: "school_id")
+  team      Team?   @relation(fields: [teamId], references: [id])
+  teamId    Int?    @map(name: "team_id")
+  creator   User?   @relation(fields: [creatorId], references: [id])
+  creatorId Int?    @map(name: "creator_id")
+  thread    Thread? @relation(fields: [threadId], references: [id])
+  threadId  Int?    @map(name: "thread_id")
+
+  options     Options[]
+  voted       Voted[]      @relation("VotedBallot")
+  votes       Votes[]
+  attachments Attachment[]
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "ballots")
+}
+
+model Options {
+  id    Int    @default(autoincrement()) @id
+  vote  Int
+  title String
+
+  ballot   Ballot @relation(fields: [ballotId], references: [id])
+  ballotId Int    @map(name: "ballot_id")
+
+  @@map(name: "options")
+}
+
+model Voted {
+  id Int @default(autoincrement()) @id
+
+  signature String? // encrypted signature of the user
+
+  user     User   @relation(name: "VotedUser", fields: [userId], references: [id])
+  userId   Int    @map(name: "user_id")
+  ballot   Ballot @relation(name: "VotedBallot", fields: [ballotId], references: [id])
+  ballotId Int    @map(name: "ballot_id")
+
+  @@map(name: "voted")
+}
+
+model Votes {
+  id     Int     @default(autoincrement()) @id
+  vote   Int // 0 = abstention, 1-x = chosen option
+  verify String? // encrypted verification token
+
+  ballot   Ballot @relation(fields: [ballotId], references: [id])
+  ballotId Int    @map(name: "ballot_id")
+
+  @@map(name: "votes")
+}
+
+model Attachment {
+  id    Int    @default(autoincrement()) @id
+  file  String
+  title String @default("")
+
+  user     User    @relation(fields: [userId], references: [id])
+  userId   Int     @map(name: "user_id")
+  ballot   Ballot? @relation(fields: [ballotId], references: [id])
+  ballotId Int?    @map(name: "ballot_id")
+  thread   Thread? @relation(fields: [threadId], references: [id])
+  threadId Int?    @map(name: "thread_id")
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "attachments")
+}
+
+model Thread {
+  id    Int     @default(autoincrement()) @id
+  title String  @default("")
+  text  String  @default("")
+  ref   String? // this can be used to reference a thread to content
+
+  user     User    @relation(fields: [userId], references: [id])
+  userId   Int     @map(name: "user_id")
+  parent   Thread? @relation(fields: [parentId], references: [id])
+  parentId Int?    @map(name: "parent_id")
+
+  ballot      Ballot?
+  children    Thread[]     @relation("ThreadToThread")
+  reactions   Reaction[]
+  attachments Attachment[]
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "threads")
+}
+
+model Reaction {
+  id    Int    @default(autoincrement()) @id
+  emoij String
+
+  user     User    @relation(fields: [userId], references: [id])
+  userId   Int     @map(name: "user_id")
+  thread   Thread? @relation(fields: [threadId], references: [id])
+  threadId Int?    @map(name: "thread_id")
+
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  @@map(name: "reactions")
+}
```


