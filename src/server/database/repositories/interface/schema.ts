import { sql, relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { userConfig, hooks } from '../../schema';

// maybe support multiple interfaces in the future
export const wgInterface = sqliteTable('interfaces_table', {
  name: text().primaryKey(),
  device: text().notNull(),
  port: int().notNull().unique(),
  privateKey: text('private_key').notNull(),
  publicKey: text('public_key').notNull(),
  ipv4Cidr: text('ipv4_cidr').notNull(),
  ipv6Cidr: text('ipv6_cidr').notNull(),
  mtu: int().notNull(),
  // does nothing yet
  enabled: int({ mode: 'boolean' }).notNull(),
  // AmneziaWG settings
  jc: int().notNull().default(5), // Junk packet count
  jmin: int().notNull().default(50), // Junk packet minimum size
  jmax: int().notNull().default(1000), // Junk packet maximum size
  s1: int().notNull().default(75), // Init packet junk size
  s2: int().notNull().default(75), // Response packet junk size
  h1: int().notNull().default(1234567891), // Init packet magic header
  h2: int().notNull().default(1234567892), // Response packet magic header
  h3: int().notNull().default(1234567893), // Underload packet magic header
  h4: int().notNull().default(1234567894), // Transport packet magic header
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const wgInterfaceRelations = relations(wgInterface, ({ one }) => ({
  hooks: one(hooks, {
    fields: [wgInterface.name],
    references: [hooks.id],
  }),
  userConfig: one(userConfig, {
    fields: [wgInterface.name],
    references: [userConfig.id],
  }),
}));
