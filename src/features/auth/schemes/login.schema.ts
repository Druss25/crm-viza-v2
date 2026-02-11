import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Некорректный почтовый адрес' }),
    password: z.string().min(8, { message: 'Пароль минимум 8 символов' })
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
