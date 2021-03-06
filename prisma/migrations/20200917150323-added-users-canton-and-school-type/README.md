# Migration `20200917150323-added-users-canton-and-school-type`

This migration has been generated by Stefan N at 9/17/2020, 5:03:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."schools" ADD COLUMN "type" text   NOT NULL DEFAULT E''

ALTER TABLE "public"."users" ADD COLUMN "canton" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200915104023-db-init..20200917150323-added-users-canton-and-school-type
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -65,8 +65,9 @@
   password String?
   gender   Gender  @default(Unkown)
   year     Int? // year born
+  canton   String? // if not set via school
   role     Role    @default(Student)
   school   School? @relation(fields: [schoolId], references: [id])
   team     Team?   @relation(fields: [teamId], references: [id])
@@ -122,8 +123,9 @@
   city    String @default("")
   canton  String @default("")
   zip     String @default("")
   address String @default("")
+  type    String @default("")
   domain   Domain?  @relation(fields: [domainId], references: [id])
   domainId Int?     @map(name: "domain_id")
   members  User[]
@@ -199,8 +201,9 @@
   @@map(name: "options")
 }
+// todo: make user-relation 1:1
 model Voted {
   id Int @default(autoincrement()) @id
   signature String? // encrypted signature of the user
@@ -212,8 +215,9 @@
   @@map(name: "voted")
 }
+// TODO: rename to singular.. but it's dangerous with automigration
 model Votes {
   id     Int     @default(autoincrement()) @id
   vote   Int // 0 = abstention, 1-x = chosen option
   verify String? // encrypted verification token
```


