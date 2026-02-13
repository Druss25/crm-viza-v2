'use client'

// import { Plus } from 'lucide-react'
import { useMediaQuery } from '@raddix/use-media-query'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'

import { Organization } from '../types'

export function OrganizationList({ data }: { data: Organization[] }) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='outline'>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <ProfileForm /> */}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant='outline'>Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className='text-left'>
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                {/* <ProfileForm className="px-4" /> */}
                <DrawerFooter className='pt-2'>
                    <DrawerClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

    // return (
    //     <div className='min-h-screen flex-1 rounded-xl border p-2 md:min-h-min md:p-4'>
    //         <div className='flex flex-col gap-4'>
    //             {/* Кнопка на создание */}
    //             <div className='flex items-center justify-end'>
    //                 <Button size='lg' className='cursor-pointer'>
    //                     <Link
    //                         href='/organization/create'
    //                         className='flex items-center justify-center gap-2'
    //                     >
    //                         <Plus className='size-4 font-bold' />
    //                         <span className=''>Организацию</span>
    //                     </Link>
    //                 </Button>
    //             </div>
    //             {/* Разделитель */}
    //             <Separator orientation='horizontal' />
    //             {/* Отображение таблицы */}
    //             <DataTable columns={columns} data={data} />
    //         </div>
    //     </div>
    // )
}
