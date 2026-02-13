export type Organization = {
    id: number
    name: string
    fullName: string | null
    inn: string | number | null

    // status: 'pending' | 'processing' | 'ended'
    // email: string
}
