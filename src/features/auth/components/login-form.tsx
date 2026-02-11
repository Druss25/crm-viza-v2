'use client'

import AuthSocial from './auth-social'
import { ErrorContext } from '@better-fetch/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

import { LoginSchema, type TypeLoginSchema } from '../schemes'

interface LoginFormProps {
    isShowSocial?: boolean
}

export function LoginForm({ isShowSocial = false }: LoginFormProps) {
    const [isPending, setIsPending] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: TypeLoginSchema) => {
        try {
            setIsPending(true)
            await authClient.signIn.email(
                {
                    email: data.email,
                    password: data.password
                },
                {
                    onSuccess: async () => {
                        toast.success('Login successful')
                        router.push('/')
                        router.refresh()
                    },
                    onError: async (ctx: ErrorContext) => {
                        toast.error(ctx.error.message ?? 'Login failed')
                    }
                }
            )
        } catch {
            toast.error('Что-то пошло не так...')
            throw new Error('Упс... Что-то пошло не так...')
        } finally {
            setIsPending(false)
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
                <CardTitle className='sm:text-xl'>Вход в аккаунт</CardTitle>
                <CardDescription>
                    Чтобы войти на сайт введите ваш email и пароль.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isShowSocial && <AuthSocial />}
                <form id='form-login' onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name='email'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-login-email'>
                                        E-mail:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-login-email'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='info@example.com'
                                        type='email'
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
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='form-login-password'>
                                        Пароль:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='form-login-password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='********'
                                        type='password'
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
                        form='form-login'
                        variant='outline'
                        className='min-w-36 cursor-pointer'
                        disabled={isPending}
                    >
                        {form.formState.isSubmitting && isPending ? (
                            <>
                                <Spinner className='size-6' />{' '}
                                <span>Загрузка...</span>
                            </>
                        ) : (
                            'Войти'
                        )}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}

export default LoginForm
