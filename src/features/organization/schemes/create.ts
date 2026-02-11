import { z } from 'zod'

export const CreateOrganizationSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Введите сокращенное название организации' })
        .max(191, { message: 'Название слишком длинное' }),
    fullName: z
        .string()
        .min(1, { message: 'Введите полное название организации' })
        .max(191, { message: 'Название слишком длинное' }),
    inFace: z
        .string()
        .min(1, { message: 'Введите в родительном падеже ФИО представителя' })
        .max(191, { message: 'Название слишком длинное' }),
    basis: z
        .string()
        .min(1, { message: 'Введите основание (Устав, доверенность)' })
        .max(191, { message: 'Название слишком длинное' }),
    jobTitle: z
        .string()
        .min(1, { message: 'Введите должность' })
        .max(191, { message: 'Название слишком длинное' }),
    fio: z
        .string()
        .min(1, { message: 'Введите инициалы и фамилию' })
        .max(191, { message: 'Название слишком длинное' }),
    details: z
        .string()
        .min(1, { message: 'Введите детали' })
        .max(500, { message: 'Название слишком длинное' }),
    phone: z
        .string()
        .min(1, { message: 'Введите номер телефона' })
        .max(16, { message: 'Не более 16 цифр' }),
    fax: z
        .string()
        .min(1, { message: 'Введите номер телефона' })
        .max(12, { message: 'Не более 12 цифр' }),
    email: z
        .string()
        .min(1, { message: 'Введите электронную почту' })
        .max(100, { message: 'Название слишком длинное' })
})

export type TypeCreateOrganizationSchema = z.infer<
    typeof CreateOrganizationSchema
>
