import { organization } from './organization-schema'
import { relations } from 'drizzle-orm'
import {
    decimal,
    index,
    int,
    mysqlTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/mysql-core'

// Хелпер для таймстампов
const timestamps = {
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull()
}

// --- ТАБЛИЦА CONTRACT ---
export const contract = mysqlTable(
    'crm_contracts',
    {
        id: int('id').primaryKey().autoincrement(),
        orgId: int('org_id')
            .notNull()
            .references(() => organization.id, { onDelete: 'cascade' }),
        regNumber: varchar('reg_number', { length: 255 }).notNull(),
        regDate: timestamp('reg_date', { fsp: 3 }).notNull(),
        startDate: timestamp('start_date', { fsp: 3 }).notNull(),
        endDate: timestamp('end_date', { fsp: 3 }).notNull(),
        ...timestamps
    },
    table => [index('contract_orgId_idx').on(table.orgId)]
)

// --- ТАБЛИЦА CONNECT ---
export const connect = mysqlTable(
    'crm_connects',
    {
        id: int('id').primaryKey().autoincrement(),
        contractId: int('contract_id')
            .notNull()
            .references(() => contract.id, { onDelete: 'cascade' }),
        fullAddress: varchar('full_address', { length: 100 }),
        country: varchar('country', { length: 25 })
            .default('Казахстан')
            .notNull(),
        city: varchar('city', { length: 25 }).default('Байконур').notNull(),
        street: varchar('street', { length: 25 }),
        building: varchar('building', { length: 25 }),
        flat: varchar('flat', { length: 255 }), // В Prisma тип String без лимита
        tariffId: int('tariff_id')
            .notNull()
            .references(() => tariff.id, { onDelete: 'cascade' }),
        ...timestamps
    },
    table => [
        index('connect_contractId_idx').on(table.contractId),
        index('connect_tariffId_idx').on(table.tariffId)
    ]
)

// --- ТАБЛИЦА TARIFF ---
export const tariff = mysqlTable('crm_tariffs', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 50 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 })
        .default('0.00')
        .notNull(),
    ...timestamps
})

// --- RELATIONS (СВЯЗИ) ---

export const contractRelations = relations(contract, ({ one, many }) => ({
    organization: one(organization, {
        fields: [contract.orgId],
        references: [organization.id]
    }),
    connects: many(connect)
}))

export const connectRelations = relations(connect, ({ one, many }) => ({
    contract: one(contract, {
        fields: [connect.contractId],
        references: [contract.id]
    }),
    tariffs: many(tariff)
}))

// export const tariffRelations = relations(tariff, ({ one }) => ({
//     connect: one(connect, {
//         fields: [tariff.id], // Как указано в Prisma @relation(fields: [id], references: [id])
//         references: [connect.tariffId]
//     })
// }))
