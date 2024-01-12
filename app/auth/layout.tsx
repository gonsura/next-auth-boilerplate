const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-2 flex items-center justify-center bg-zinc-100 text-zinc-500 min-h-screen'>
      {children}
    </div>
  )
}
export default AuthLayout
