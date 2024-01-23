import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['600'] })
import { cn } from '@/lib/utils'
import { LoginButton } from '../components/auth/loggin-button'

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-zinc-100 text-zinc-500'>
      <div className='space-y-6 text-center'>
        <h1 className={cn('text-6xl font-semibold', poppins.className)}>
          auth
        </h1>
        <p>boilerplate autentication</p>
        <div>
          <LoginButton>sign in</LoginButton>
        </div>
      </div>
    </main>
  )
}
