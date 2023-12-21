import Image from 'next/image'
import React from 'react'
import notFoundImage from '/public/3793096.jpg';

export default function SnippetNotFound() {
  return (
    <div className='w-11/12 md:w-10/12 mx-auto h-screen flex flex-col items-center justify-center'>
      <Image src={notFoundImage} alt='Illustration' width={100} height={100} />
      <h1 className='text-4xl font-bold w-1/2 text-center'>
        The requested snippets seems to be not available right now.
      </h1>
    </div>
  )
}
