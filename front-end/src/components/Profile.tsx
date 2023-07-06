import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  // eslint-disable-next-line camelcase
  const { name, avatar_url } = getUser()
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        // eslint-disable-next-line camelcase
        src={avatar_url}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[144px] text-sm leading-snug">
        {name}
        <a
          className=" block text-red-400 hover:text-red-300"
          href="/api/auth/logout"
        >
          {' '}
          Quero sai
        </a>
      </p>
    </div>
  )
}
