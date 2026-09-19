import { bigint, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const formLimits = pgTable(
  "form_limits",
  {
    key: text("key").primaryKey(),
    windowStart: bigint("window_start", { mode: "number" }).notNull(),
    count: integer("count").notNull().default(1),
  },
  (table) => [index("form_limits_window_idx").on(table.windowStart)],
);

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("messages_status_created_idx").on(table.status, table.createdAt)],
);

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    message: text("message").notNull(),
    page: text("page").notNull().default("topluluk"),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("comments_status_created_idx").on(table.status, table.createdAt)],
);
