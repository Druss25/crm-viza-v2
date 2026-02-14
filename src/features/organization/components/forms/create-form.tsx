'use client'

import {
    CreateOrganizationSchema,
    type TypeCreateOrganizationSchema
} from './schemes-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveAll, SaveOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { advancedTypography } from '@/lib/advanced-typography'
import { cn } from '@/lib/utils'

interface CreateOrganizationFormProps {
    isDesktop: boolean
    setOpen: (open: boolean) => void
}

export function CreateOrganizationForm({
    isDesktop,
    setOpen
}: CreateOrganizationFormProps) {
    const baseURL = 'http://localhost:3000/api/organization'
    const router = useRouter()
    const [isPending, setIsPending] = useState<boolean>(false)

    const form = useForm<TypeCreateOrganizationSchema>({
        resolver: zodResolver(CreateOrganizationSchema),
        defaultValues: {
            name: '',
            fullName: '',
            inn: ''
        }
    })

    const onSubmit = async (data: TypeCreateOrganizationSchema) => {
        try {
            setIsPending(true)

            const org = {
                name: advancedTypography(data.name),
                fullName:
                    data.fullName && data.fullName.length > 0
                        ? advancedTypography(data.fullName)
                        : data.fullName,
                inn: data.inn
            }

            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(org)
            })

            if (!response.ok) {
                throw new Error('Не удалось создать организацию')
            }

            const result = (await response.json()) as {
                success: boolean
                message: string
            }

            if (result.success) {
                toast.success(`Организация ${org.name} успешно создана`)
                router.refresh()
                setOpen(false)
            }

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
            className='h-full px-4 sm:px-0'
        >
            <FieldGroup className='flex flex-col gap-3'>
                <div className='flex flex-wrap gap-3 md:flex-nowrap'>
                    <Controller
                        name='name'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='form-org-name'>
                                    Наименование *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='form-org-name'
                                    aria-invalid={fieldState.invalid}
                                    placeholder='ООО "Телекомпания Виза-2"'
                                    disabled={isPending}
                                    autoComplete='off'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name='inn'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='form-org-inn'>
                                    ИНН/ИИН *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='form-org-inn'
                                    aria-invalid={fieldState.invalid}
                                    placeholder='9901034065'
                                    disabled={isPending}
                                    autoComplete='off'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name='fullName'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='form-org-full-name'>
                                Полное наименование
                            </FieldLabel>
                            <Input
                                {...field}
                                id='form-org-full-name'
                                aria-invalid={fieldState.invalid}
                                placeholder='Общество с ограниченной ответственностью "Телекомпания Виза-2"'
                                disabled={isPending}
                                autoComplete='off'
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div
                className={cn(
                    'group/sidebar-wrapper mt-9',
                    isDesktop
                        ? 'flex justify-end gap-4'
                        : 'mb-4 flex flex-col-reverse gap-4'
                )}
            >
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                    className={cn('min-w-32', !isDesktop && 'w-full')}
                >
                    <SaveOff />
                    <span>Отмена</span>
                </Button>
                <Button
                    type='submit'
                    disabled={isPending}
                    className={cn('min-w-32', !isDesktop && 'w-full')}
                >
                    <SaveAll />
                    <span>Сохранить</span>
                </Button>
            </div>
        </form>
    )
}
