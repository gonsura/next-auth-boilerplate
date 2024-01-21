import { auth, signOut } from '@/auth'

const SettingspPage = async () => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button
          type='submit'
          className='bg-red-500 text-white px-3 py-1 m-2'
        >
          Sign out
        </button>
      </form>
    </div>
  )
}
export default SettingspPage
