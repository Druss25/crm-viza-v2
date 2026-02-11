import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { auth } from '@/lib/auth'
import { db } from '@/lib/database'

import { AppSidebar } from '@/components'
import { user } from '@/db/schema/auth-schema'

export default async function CRMLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const count = await db.$count(user)

    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true
        },
        headers: await headers()
    })

    if (!session && count === 0) {
        redirect('/register')
    } else {
        if (!session) {
            redirect('/login')
        }
    }

    return (
        <>
            <SidebarProvider>
                <AppSidebar
                    user={{
                        name: session.user.name,
                        email: session.user.email,
                        avatar: session.user.image
                    }}
                />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </>
    )
}
