import React from 'react'
import { db } from '@/db';
import { notFound } from 'next/navigation';
import EditSnippetForm from '@/components/EditSnippetForm';

interface IEditSnippet {
  params: {
    id: string
  }
}

export default async function EditSnippet(props: IEditSnippet) {
  const { id } = props.params;

  const snippet = await db.snippets.findFirst({ where: { id } })

  if(!snippet) {
    return notFound();
  }

  return (
    <div className='w-11/12 md:w-10/12 lg:w-8/12 mx-auto'>
      <EditSnippetForm snippet={snippet} />
    </div>
  )
}
