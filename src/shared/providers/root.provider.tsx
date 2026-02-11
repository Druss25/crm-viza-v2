'use client'

import { ThemeProvider } from './theme.provider'
import { type PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/sonner'

export function RootProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <Toaster position='bottom-right' />
            {children}
        </ThemeProvider>
    )
}
