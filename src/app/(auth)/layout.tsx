export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='flex h-dvh items-center justify-center px-6 sm:px-2'>
            {children}
        </div>
    )
}
