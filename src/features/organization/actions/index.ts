import { db } from '@/lib/database'

import { organization } from '@/db/schema'

export async function getOrganizationAll() {
    try {
        const query = db
            .select({
                id: organization.id,
                name: organization.name,
                fullName: organization.fullName,
                inn: organization.inn
            })
            .from(organization)
            .prepare()
        return await query.execute()
    } catch (error) {
        console.log('Error: ', error)
        throw new Error('Ошибка получения данных')
    }
}
