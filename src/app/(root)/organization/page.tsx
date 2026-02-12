import { OrganizationList } from '@/features/organization/components'

import AppWrapper from '@/components/app-wrapper'

export default function OrganizationPage() {
    return (
        <AppWrapper title='Список организаций'>
            <OrganizationList />
        </AppWrapper>
    )
}
