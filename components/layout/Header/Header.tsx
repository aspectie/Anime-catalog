'use client'

import React from 'react'
import { BackButton } from './back-button'

export function Header({
  children,
  isWithBackButton
}: {
  children: React.ReactNode
  isWithBackButton?: boolean
}) {
  return (
    <div className="container">
      <div className="mx-auto p-6 flex items-center ">
        {isWithBackButton && <BackButton />}
        <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
      </div>
    </div>
  )
}
