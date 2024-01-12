'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface LogginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LogginButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return <span>todo implement modal</span>
  }
  return (
    <Button onClick={onClick} size={'lg'}>{children}</Button>
  )
}
