'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if(success || error) return
    if (!token) {
      setError('missing token')
      return
    }
    newVerification(token).then((res) => {
      setSuccess(res.success)
      setError(res.error)
    }).catch((err) => {
      setError('something went wrong')
    })
  }, [token, error, success])

  useEffect(() => {
    onSubmit()
  }, [onSubmit, ])

  return (
    <CardWrapper
      headerLabel='confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='auth/login'
    >
      <div className='w-full flex justify-center items-center'>
        {!success && !error && <BeatLoader/>}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
