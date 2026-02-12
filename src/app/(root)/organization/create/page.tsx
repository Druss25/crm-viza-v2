import { OrganizationCreate } from '@/features/organization/components'

import AppWrapper from '@/components/app-wrapper'

export default function OrganizationCreatePage() {
    return (
        <AppWrapper title='Добавить организацию'>
            <OrganizationCreate />
        </AppWrapper>
    )
}
