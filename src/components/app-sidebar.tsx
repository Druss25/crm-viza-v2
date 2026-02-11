'use client'

import { BookOpen, GalleryVerticalEnd, Settings2 } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from '@/components/ui/sidebar'

import { NavMain, NavUser, TeamSwitcher } from '@/components'

// This is sample data.
const data = {
    user: {
        name: 'Druss25',
        email: 'druss25@yandex.ru',
        avatar: '/avatars/shadcn.jpg'
    },
    teams: [
        {
            name: 'Viza-2 Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise'
        }
    ],
    navMain: [
        // {
        //     title: 'Playground',
        //     url: '#',
        //     icon: SquareTerminal,
        //     // isActive: true,
        //     items: [
        //         {
        //             title: 'History',
        //             url: '#'
        //         },
        //         {
        //             title: 'Starred',
        //             url: '#'
        //         },
        //         {
        //             title: 'Settings',
        //             url: '#'
        //         }
        //     ]
        // },
        // {
        //     title: 'Models',
        //     url: '#',
        //     icon: Bot,
        //     items: [
        //         {
        //             title: 'Genesis',
        //             url: '#'
        //         },
        //         {
        //             title: 'Explorer',
        //             url: '#'
        //         },
        //         {
        //             title: 'Quantum',
        //             url: '#'
        //         }
        //     ]
        // },
        {
            title: 'Организации',
            url: '#',
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: 'Список',
                    url: '/organization'
                },
                {
                    title: 'Get Started',
                    url: '#'
                },
                {
                    title: 'Tutorials',
                    url: '#'
                },
                {
                    title: 'Changelog',
                    url: '#'
                }
            ]
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#'
                },
                {
                    title: 'Team',
                    url: '#'
                },
                {
                    title: 'Billing',
                    url: '#'
                },
                {
                    title: 'Limits',
                    url: '#'
                }
            ]
        }
    ]
    // projects: [
    //     {
    //         name: 'Design Engineering',
    //         url: '#',
    //         icon: Frame
    //     },
    //     {
    //         name: 'Sales & Marketing',
    //         url: '#',
    //         icon: PieChart
    //     },
    //     {
    //         name: 'Travel',
    //         url: '#',
    //         icon: Map
    //     }
    // ]
}

interface AppSidebarProps {
    user: {
        name: string
        email: string
        avatar?: string | null
    }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
