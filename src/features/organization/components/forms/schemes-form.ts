import { z } from 'zod'

export const CreateOrganizationSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Введите сокращенное название организации' })
        .max(191, { message: 'Название слишком длинное' }),
    fullName: z
        .string()
        .max(150, { message: 'Название организации слишком длинное' })
        .optional(),
    inn: z
        .string()
        .min(1, { message: 'Введите ИНН организации' })
        .max(10, { message: 'ИНН не может быть больше 10 символов' })
})

export type TypeCreateOrganizationSchema = z.infer<
    typeof CreateOrganizationSchema
>
