import { updateOrganizationSchema } from './validations'
import { eq } from 'drizzle-orm'

import { db } from '@/lib/database'
import { handleDbOp } from '@/lib/handle-db.action'

import { organization } from '@/db/schema'

export async function updateOrganization(id: number, data: unknown) {
    const v = updateOrganizationSchema.safeParse(data)

    if (!v.success) {
        return {
            success: false,
            error: v.error.issues.map(
                issue => `${issue.path.join('.')}: ${issue.message}`
            )
        }
    }

    return handleDbOp(
        db.update(organization).set(v.data).where(eq(organization.id, id))
    )
}
