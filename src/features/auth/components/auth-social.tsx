import { FaGoogle, FaYandex } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function AuthSocial() {
    return (
        <>
            <div className='grid grid-cols-2 gap-6'>
                <Button variant='outline'>
                    <FaGoogle className='mr-2 size-4' />
                    Google
                </Button>
                <Button variant='outline'>
                    <FaYandex className='mr-2 size-4' />
                    Яндекс
                </Button>
            </div>
            <div className='relative my-4 flex items-center justify-center overflow-hidden'>
                <Separator />
                <div className='bg-background px-2 text-center text-sm uppercase'>
                    Или
                </div>
                <Separator />
            </div>
        </>
    )
}
