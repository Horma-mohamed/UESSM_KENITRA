import React from 'react'
import NavBar from '../components/NavBar'

export default function DefaultLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div>
      <NavBar user='' />
         {children}
    </div>
  )
}
