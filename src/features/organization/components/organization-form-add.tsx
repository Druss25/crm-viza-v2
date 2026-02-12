'use client'

import { OrganizationCard } from './organization-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'

import {
    CreateOrganizationSchema,
    TypeCreateOrganizationSchema
} from '../schemes'

export function OrganizationAddForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState<boolean>(false)

    const form = useForm<TypeCreateOrganizationSchema>({
        resolver: zodResolver(CreateOrganizationSchema),
        defaultValues: {
            name: '',
            fullName: '',
            inFace: '',
            basis: '',
            jobTitle: '',
            fio: '',
            details: '',
            phone: '',
            fax: '',
            email: ''
        }
    })

    const onSubmit = async (data: TypeCreateOrganizationSchema) => {
        try {
            setIsPending(true)

            console.log(data)
            toast.success(`Организация ${data.name} успешно создана`)
            router.push('/organization')
            router.refresh()

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(`Не удалось создать организацию ${data.name}` || error)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <form
            id='form-org-create'
            onSubmit={form.handleSubmit(onSubmit)}
            className='h-full'
        >
            <div className='flex h-full flex-col justify-between'>
                <div className='grid grid-cols-2 gap-5'>
                    <OrganizationCard title='Наименование организация'>
                        <CardContent>
                            <FieldGroup>
                                <Controller
                                    name='name'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-name'>
                                                Наименование:
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='form-org-name'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder='ООО "Телекомпания Виза-2"'
                                                disabled={isPending}
                                                autoComplete='off'
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name='fullName'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-full-name'>
                                                Полное наименование:
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='form-org-full-name'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder='Общество с ограниченной ответственностью "Телекомпания Виза-2"'
                                                disabled={isPending}
                                                autoComplete='off'
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name='inFace'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-in-face'>
                                                В лице:
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='form-org-in-face'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder='Верещак Алексея Аскольдовича'
                                                disabled={isPending}
                                                autoComplete='off'
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name='basis'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-basis'>
                                                На основание:
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='form-org-basis'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder='Устава'
                                                disabled={isPending}
                                                autoComplete='off'
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                                <div className='flex flex-wrap items-center gap-5 md:flex-nowrap'>
                                    <Controller
                                        name='jobTitle'
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor='form-org-job-title'>
                                                    Должность:
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id='form-org-job-title'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder='Директор'
                                                    disabled={isPending}
                                                    autoComplete='off'
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name='fio'
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor='form-org-in-fio'>
                                                    ФИО:
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id='form-org-in-fio'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder='И.О. Иванов'
                                                    disabled={isPending}
                                                    autoComplete='off'
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </OrganizationCard>
                    <OrganizationCard title='Реквизиты организация'>
                        <CardContent>
                            <FieldGroup>
                                <Controller
                                    name='details'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-details'>
                                                Реквизиты:
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    id='form-org-details'
                                                    placeholder='Напишите, пожалуйста, реквизиты организации'
                                                    rows={20}
                                                    className='min-h-46 resize-none'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                <InputGroupAddon align='block-end'>
                                                    <InputGroupText className='tabular-nums'>
                                                        {field.value.length}/500
                                                        символов
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {/* <FieldDescription>
                                        Include steps to reproduce, expected
                                        behavior, and what actually happened.
                                    </FieldDescription> */}
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <div className='flex flex-wrap items-center gap-5 md:flex-nowrap'>
                                    <Controller
                                        name='phone'
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor='form-org-phone'>
                                                    Телефон:
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id='form-org-phone'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder='+7(705)450-76-66 или 4-39-28'
                                                    disabled={isPending}
                                                    autoComplete='off'
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name='fax'
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor='form-org-fax'>
                                                    Факс:
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id='form-org-fax'
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    placeholder='+7(705)450-76-66 или 4-39-28'
                                                    disabled={isPending}
                                                    autoComplete='off'
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <Controller
                                    name='email'
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor='form-org-email'>
                                                E-mail:
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='form-org-email'
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder='example@mail.ru'
                                                disabled={isPending}
                                                autoComplete='off'
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </CardContent>
                    </OrganizationCard>
                </div>
                <div className='flex flex-col gap-6'>
                    <Separator orientation='horizontal' />
                    <div className='flex justify-end'>
                        <Button
                            type='submit'
                            variant='outline'
                            disabled={isPending}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
