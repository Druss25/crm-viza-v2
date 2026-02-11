'use client'

import AuthSocial from './auth-social'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import { authClient } from '@/lib/auth-client'

import { RegisterSchema, type TypeRegisterSchema } from '../schemes'

export function RegisterForm({
    isShowSocial = false
}: {
    isShowSocial?: boolean
}) {
    const router = useRouter()

    const form = useForm<TypeRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordRepeat: ''
        }
    })

    const onSubmit = async (data: TypeRegisterSchema) => {
        try {
            await authClient.signUp.email(
                {
                    name: data.name,
                    email: data.email,
                    password: data.password
                },
                {
                    onSuccess: async () => {
                        toast.success('Login successful')
                        router.push('/')
                        router.refresh()
                    },
                    onError: async ctx => {
                        toast.error(ctx.error.message)
                    }
                }
            )
        } catch {
            toast.error('Что-то пошло не так...')
            throw new Error('Упс... Что-то пошло не так...')
        }

        // toast('You submitted the following values:', {
        //     description: (
        //         <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
        //             <code>{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        //     position: 'bottom-right',
        //     classNames: {
        //         content: 'flex flex-col gap-2'
        //     },
        //     style: {
        //         '--border-radius': 'calc(var(--radius)  + 4px)'
        //     } as React.CSSProperties
        // })
    }

    return (
        <Card className='w-full sm:max-w-md'>
            <CardHeader>
                <CardTitle className='sm:text-lg'>Регистрация</CardTitle>
                <CardDescription>
                    Для входа на сайт нужно пройти регистрацию.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isShowSocial && <AuthSocial />}
                <form id='form-register' onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-register-name'>
                                        Имя:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-register-name'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Иван'
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
                            name='email'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-register-email'>
                                        Email:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-register-email'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='info@example.com'
                                        type='email'
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
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-register-password'>
                                        Пароль:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-register-password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='********'
                                        type='password'
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
                            name='passwordRepeat'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-register-password-repeat'>
                                        Повторите пароль:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-register-password-repeat'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='********'
                                        type='password'
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
                </form>
            </CardContent>
            <CardFooter>
                <Field
                    className='flex w-full justify-end'
                    orientation='horizontal'
                >
                    {/* <Button
                        type='button'
                        variant='outline'
                        className='cursor-pointer'
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button> */}
                    <Button
                        type='submit'
                        form='form-register'
                        variant='outline'
                        className='cursor-pointer'
                    >
                        {form.formState.isSubmitting ? (
                            <Spinner className='size-6' />
                        ) : (
                            'Зарегистрировать аккаунт'
                        )}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}

export default RegisterForm
