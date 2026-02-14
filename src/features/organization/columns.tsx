'use client'

import { Organization } from './types'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Organization>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={value =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    // {
    //     accessorKey: 'status',
    //     header: '',
    //     cell: ({ row }) => {
    //         const status = row.getValue('status')

    //         return (
    //             <div className='flex items-center justify-center'>
    //                 <div
    //                     className={cn(
    //                         'h-3 w-3 rounded-full',
    //                         status === 'pending'
    //                             ? 'bg-yellow-500'
    //                             : status === 'processing'
    //                               ? 'bg-green-500'
    //                               : 'bg-red-500'
    //                     )}
    //                 />
    //             </div>
    //         )
    //     }
    // },
    {
        accessorKey: 'name',
        header: 'Наименование',
        cell: ({ row }) => {
            const name = row.getValue('name') as string

            return (
                <Link
                    href={`/organization/${row.original.id}`}
                    className='w-full cursor-pointer uppercase hover:underline'
                >
                    {name}
                </Link>
            )
        }
    },
    {
        accessorKey: 'fullName',
        header: 'Полное наименование'
    },
    {
        accessorKey: 'inn',
        header: 'ИНН'
    }
]
