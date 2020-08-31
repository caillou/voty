# Migration `20200829122407-rename-role-unkown-to-user`

This migration has been generated by Stefan N at 8/29/2020, 2:24:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
Begin;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN', 'STUDENT', 'TEACHER', 'PRINCIPAL');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT,
                            ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new"),
                            ALTER COLUMN "role" SET DEFAULT 'USER';
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
Commit
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200829071745-added-new-roles--unkown--principal---changed-order-of-roles..20200829122407-rename-role-unkown-to-user
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
@@ -39,9 +39,9 @@
   @@map(name: "sessions")
 }
 enum Role {
-  UNKOWN
+  USER
   ADMIN
   STUDENT
   TEACHER
   PRINCIPAL
```

