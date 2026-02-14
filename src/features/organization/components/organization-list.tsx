'use client'

import { OrganizationModal } from './add-modal'
import { CreateOrganizationForm } from './forms'
import { useMediaQuery } from '@raddix/use-media-query'
import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

import { columns } from '../columns'
import type { Organization } from '../types'

import { DataTable } from '@/components'

export function OrganizationList({ data }: { data: Organization[] }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    const isReady = data && data.length > 0

    return (
        <div className='h-full flex-1 rounded-xl border px-4 py-6'>
            <div
                className={cn(
                    'flex h-full flex-col gap-4',
                    !isReady && 'items-center justify-center'
                )}
            >
                {!isReady && (
                    <>
                        <span className='text-foreground text-2xl'>
                            Нет данных
                        </span>
                        <p className='text-muted-foreground mb-6'>
                            Для начала добавьте организацию
                        </p>
                    </>
                )}
                <div className={cn(isReady && 'flex items-center justify-end')}>
                    <OrganizationModal
                        title='Добавить организацию'
                        description="Заполните все поля помеченные '*', чтобы добавить организацию в список"
                        isDesktop={isDesktop}
                        btnTitle='Добавить'
                        open={open}
                        setOpen={setOpen}
                    >
                        <CreateOrganizationForm
                            isDesktop={isDesktop}
                            setOpen={setOpen}
                        />
                    </OrganizationModal>
                </div>
                {isReady && (
                    <>
                        <Separator orientation='horizontal' />
                        <DataTable columns={columns} data={data} />
                    </>
                )}
            </div>
        </div>
    )
}
