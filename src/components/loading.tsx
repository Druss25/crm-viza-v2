import { LucideLoader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Loading({
    className
}: Readonly<{
    className?: string
}>) {
    return (
        <div
            className={cn(
                'flex items-center justify-center text-sm',
                className
            )}
        >
            <LucideLoader2 className='mr-2 size-5 animate-spin' />
            Загрузка...
        </div>
    )
}
