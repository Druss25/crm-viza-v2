import { createInsertSchema } from 'drizzle-zod'

import { organization } from '@/db/schema'

export const insertOrganizationSchema = createInsertSchema(organization, {
    name: schema => schema.min(3, 'Название слишком короткое'),
    fullName: schema =>
        schema.min(3, 'Полное название слишком короткое').optional(),
    inn: schema => schema.length(10, 'ИНН должен содержать 10 цифр')
}).omit({ id: true })

export const updateOrganizationSchema = insertOrganizationSchema.partial()
