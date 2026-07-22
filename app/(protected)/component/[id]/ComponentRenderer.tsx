'use client'
import { Suspense } from 'react'
import { Components } from '@/__registry__/components'

interface Props {
  id: string
}

export default function ComponentRenderer({ id }: Props) {
  const SelectedComponent = Components[id]

  if (!SelectedComponent) return null

  return (
    <Suspense fallback={
      <div className='flex items-center justify-center h-40'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
      </div>
    }>
      <SelectedComponent />
    </Suspense>
  )
}