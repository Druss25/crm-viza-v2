import { NextResponse } from 'next/server'

import { createOrganization } from '@/features/organization/actions'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Валидация
        if (!body.name && !body.inn) {
            return NextResponse.json(
                { error: 'Ошибка запроса' },
                { status: 400 }
            )
        }

        // Вставка данных
        const res = await createOrganization(body)

        return NextResponse.json(res, { status: 201 })
    } catch (error) {
        console.error('Drizzle error:', error)
        return NextResponse.json(
            { error: 'Failed to create organization' },
            { status: 500 }
        )
    }
}
