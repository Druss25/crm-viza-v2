import { Plus } from 'lucide-react'

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
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'

interface OrganizationModalProps {
    title: string
    description: string
    isDesktop: boolean
    btnTitle: string
    open: boolean
    setOpen: (open: boolean) => void
    children: React.ReactNode
}

export function OrganizationModal({
    title,
    description,
    isDesktop,
    btnTitle,
    open,
    setOpen,
    children
}: OrganizationModalProps) {
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        size='lg'
                        className='flex cursor-pointer items-center justify-center gap-2'
                    >
                        <Plus className='size-4 font-bold' />
                        <span>{btnTitle}</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-3xl'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button size='lg' className='cursor-pointer'>
                    {btnTitle}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='text-left'>{title}</DrawerTitle>
                    <DrawerDescription className='text-left'>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                {children}
                {/* <DrawerFooter className='pt-2'>
                    <DrawerClose asChild>
                        <Button variant='outline'>Отмена</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}
