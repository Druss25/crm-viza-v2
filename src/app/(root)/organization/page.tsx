import { getOrganizationAll } from '@/features/organization/actions'
import { OrganizationList } from '@/features/organization/components'

import AppWrapper from '@/components/app-wrapper'

async function OrganizationPage() {
    const data = await getOrganizationAll()

    return (
        <AppWrapper title='Список организаций'>
            <OrganizationList data={data} />
        </AppWrapper>
    )
}

export default OrganizationPage
