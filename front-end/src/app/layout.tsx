import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { Signin } from '@/components/Signin'
import {
  Bai_Jamjuree as BaiJanjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import './globals.css'
const roboto = Roboto({ subsets: ['latin'], variable: '--roboto' })

const baiJamjuree = BaiJanjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--bai-juree',
})

export const metadata = {
  title: 'Spacetime',
  description:
    'Uma cápsula do tempo construida com React, Nextjs, TailwindCSS, Typescript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable}font-sans ${baiJamjuree.variable} bg-gray-900 text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-gray-100/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />
            <div className="absolute bottom-0 right-0 top-0 w-2 border-r  bg-stripes" />

            {isAuthenticated ? <Profile /> : <Signin />}
            <Hero />
            <Copyright />
          </div>
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover  ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
