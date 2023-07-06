import decode from 'jwt-decode'
import { cookies } from 'next/dist/client/components/headers'
interface User {
  sub: string
  name: string
  avatar_url: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value
  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: User = decode(token)

  return user
}
