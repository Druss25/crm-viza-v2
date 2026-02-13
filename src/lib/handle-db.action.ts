import { ActionResponse } from './types'

export async function handleDbOp<T>(
    op: Promise<T>
): Promise<ActionResponse<T>> {
    try {
        const res = await op

        const header = Array.isArray(res) ? res[0] : res

        if (
            header &&
            typeof header === 'object' &&
            'affectedRows' in header &&
            header.affectedRows === 0
        ) {
            return {
                success: false,
                error: 'Запись не найдена или данные не изменены'
            }
        }

        return { success: true, data: res }
    } catch (e) {
        console.error('DB Error:', e)
        return { success: false, error: 'Ошибка базы данных' }
    }
}
