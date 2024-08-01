import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "./db";
import {
  InsertUser,
  SelectUser,
  SelectRecipe,
  usersTable,
  recipesTable,
} from "./schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    name: string;
    email: string;
    password: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function updateRecipe(
  id: SelectRecipe["id"],
  data: Partial<Omit<SelectRecipe, "id">>,
) {
  await db.update(recipesTable).set(data).where(eq(recipesTable.id, id));
}

export async function deleteUser(id: SelectUser["id"]) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
