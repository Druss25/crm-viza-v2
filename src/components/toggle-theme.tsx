'use client'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant='outline'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='bg-secondary hover:bg-accent h-8 w-8 p-2'
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    )
}
