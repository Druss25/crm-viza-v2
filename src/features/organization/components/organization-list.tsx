import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { getOrganizationAll } from '../actions'
import { columns } from '../columns'

import { DataTable } from '@/components'

// async function getData(): Promise<Contract[]> {
//     return new Promise((resolve, reject) => {
//         const data = contracts
//         if (data !== undefined) {
//             return resolve(contracts)
//         } else {
//             return reject()
//         }
//     })
// }

export async function OrganizationList() {
    const data = await getOrganizationAll()

    return (
        <div className='bg-muted/50 min-h-screen flex-1 rounded-xl p-2 md:min-h-min md:p-4'>
            <div className='flex flex-col gap-4'>
                {/* Кнопка на создание */}
                <div className='flex items-center justify-end'>
                    <Button className='cursor-pointer p-4' variant='outline'>
                        <Link
                            href='/organization/create'
                            className='flex items-center justify-center gap-2'
                        >
                            <Plus className='size-4 font-bold' />
                            <span className=''>Организацию</span>
                        </Link>
                    </Button>
                </div>
                {/* Разделитель */}
                <Separator orientation='horizontal' />
                {/* Отображение таблицы */}
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
