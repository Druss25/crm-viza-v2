import { Dashboard } from '@/features/dashboard/components'

import AppWrapper from '@/components/app-wrapper'

export default function RootPage() {
    return (
        <AppWrapper title='Dashboard'>
            <Dashboard />
        </AppWrapper>
    )
}
