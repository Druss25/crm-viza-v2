export type Contract = {
    id: number
    name: string
    inn: number | string
    status: 'pending' | 'processing' | 'ended'
    email: string
}
