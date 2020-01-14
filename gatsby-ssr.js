import React from 'react'
import { AppLayout } from './src/components/AppLayout'

export const wrapPageElement = ({ element }) => {
  return <AppLayout>{element}</AppLayout>
}
