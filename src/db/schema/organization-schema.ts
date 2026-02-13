import { contract } from './dogovor-schema'
import { relations } from 'drizzle-orm'
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

// Хелпер для таймстампов, чтобы не дублировать код
const timestamps = {
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull()
}

// --- ТАБЛИЦА ORGANIZATION ---
export const organization = mysqlTable('crm_organizations', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 255 }), // Опционально (?) в Prisma
    inn: varchar('inn', { length: 25 }), // Опционально
    ...timestamps
})

// --- ТАБЛИЦА DETAILS ---
export const details = mysqlTable('crm_org_details', {
    id: int('id').primaryKey().autoincrement(),
    orgId: int('org_id')
        .notNull()
        .unique() // Реализует связь 1:1
        .references(() => organization.id, { onDelete: 'cascade' }),
    kpp: varchar('kpp', { length: 25 }),
    ogrn: varchar('ogrn', { length: 25 }),
    phone: varchar('phone', { length: 50 }),
    email: varchar('email', { length: 255 }),
    urAddress: varchar('ur_address', { length: 255 }),
    factAddress: varchar('fact_address', { length: 255 }),
    postAddress: varchar('post_address', { length: 255 }),
    ...timestamps
})

// --- СВЯЗИ (RELATIONS) ---
export const organizationRelations = relations(
    organization,
    ({ one, many }) => ({
        detail: one(details, {
            fields: [organization.id],
            references: [details.orgId]
        }),
        contract: many(contract) // Добавьте, когда создадите таблицу contract
    })
)

export const detailsRelations = relations(details, ({ one }) => ({
    organization: one(organization, {
        fields: [details.orgId],
        references: [organization.id]
    })
}))

// db.query.organization.findFirst({ with: { details: true } })
