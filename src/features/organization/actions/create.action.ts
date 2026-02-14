import { insertOrganizationSchema } from './validations'

import { db } from '@/lib/database'
import { handleDbOp } from '@/lib/handle-db.action'

import { organization } from '@/db/schema'

export async function createOrganization(data: {
    name: string
    fullName?: string
    inn: string
}) {
    const v = insertOrganizationSchema.safeParse(data)
    if (!v.success) return { success: false, error: v.error.message }

    return handleDbOp(db.insert(organization).values(v.data).$returningId())
}
