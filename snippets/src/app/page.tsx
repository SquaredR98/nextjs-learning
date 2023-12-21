import { db } from '@/db';

export default async function Home() {
  const snippets = await db.snippets.findMany();

  const renderedSnippets = snippets.map((snippet, idx) => <div key={idx}>{snippet.title}</div>)

  return (
    <div className='w-11/12 md:w-10/12 mx-auto'>{renderedSnippets}</div>
  )
}
