import React from 'react'

function AuthLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="flex items-center justify-center mt-[100px]">{children}</div>
  )
}

export default AuthLayout