import React from 'react'

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div>
        {/* <div className="w-screen h-20 bg-red-300"></div> */}
        {children}
    </div>
  )
}
