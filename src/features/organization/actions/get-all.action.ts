import { db } from '@/lib/database'

export async function getOrganizationAll() {
    return await db.query.organization.findMany({
        columns: {
            id: true,
            name: true,
            fullName: true,
            inn: true
        }
    })
}
