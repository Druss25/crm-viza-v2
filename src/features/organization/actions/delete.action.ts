import { eq } from 'drizzle-orm'

import { db } from '@/lib/database'
import { handleDbOp } from '@/lib/handle-db.action'

import { organization } from '@/db/schema'

export async function deleteOrganization(id: number) {
    if (!id || isNaN(id)) {
        return { success: false, error: 'Невалидный ID' }
    }

    return handleDbOp(db.delete(organization).where(eq(organization.id, id)))
}
