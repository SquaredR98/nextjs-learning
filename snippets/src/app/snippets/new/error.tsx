'use client'
import React from 'react'

interface IErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function error({ error } : IErrorPageProps) {
  return (
    <div>
      {error.message}
    </div>
  )
}
