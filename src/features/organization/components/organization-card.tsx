import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'

interface OrganizationCardProps {
    title: string
    className?: string
    children: React.ReactNode
}

export function OrganizationCard({
    title,
    className,
    children
}: OrganizationCardProps) {
    return (
        <Card className={cn('relative mt-4 w-full', className)}>
            <>
                <div className='absolute -top-3.5 left-8'>
                    <span className='bg-muted text-muted-foreground rounded-full border px-2.5 py-0.5 text-sm'>
                        {title}
                    </span>
                </div>
                {children}
            </>
        </Card>
    )
}
