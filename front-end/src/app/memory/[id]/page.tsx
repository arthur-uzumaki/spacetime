

import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Memory {
  params: {
    id: string
  }

  // Adicione as propriedades da memória aqui
}

interface MemoryPage {
  id: string
  converUrl: string
  createdAt: string
  content: string,

}

async function getData(params: { id: string }): Promise<MemoryPage> {
 
  const token = cookies().get('token')?.value

  const response = await api.get(`memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memoryData = response.data
  console.log(memoryData)
  
  return memoryData 
}

export default async function MemoryPage({ params, }: Memory) {
  const memoryData: MemoryPage = await getData({ id: params.id });
  console.log(memoryData.converUrl);
  
  return (
    <div className="flex flex-col gap-10 p-8">
      <time className=" -ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memoryData.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>

      <Image
        src={memoryData.converUrl}
        alt=""
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
      />

      <p className="text-lg leading-relaxed text-gray-100">
        {memoryData.content}
      </p>

      <Link className='flex  items-center gap-2' href="/">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
    </div>
  )
}

