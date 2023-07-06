'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [previw, setPreviw] = useState<string | null>(null)
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }

    const previwURL = URL.createObjectURL(files[0])

    setPreviw(previwURL)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        name="media"
        accept="image/*"
        className="invisible "
      />

      {previw && (
        <Image
          src={previw}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
          quality={100}
          width={40}
          height={40}
        />
      )}
    </>
  )
}
