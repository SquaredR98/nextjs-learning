import React from 'react';
import { db } from '../../../db';
import { notFound } from 'next/navigation';

interface ISnippetShowProps {
  params: {
    id: string;
  }
}

export default async function ShowSnippet(props: ISnippetShowProps) {
  const { id } = props.params;
  const snippet = await db.snippets.findFirst({ where: { id } })
  if(!snippet) {
    return notFound();
  }
  return (
    <div className='w-11/12 md:w-10/12 mx-auto'>
      <h1>{snippet.title}</h1>
    </div>
  )
}
