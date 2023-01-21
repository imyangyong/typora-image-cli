/**
* @file typora main file
* @author Angus Yang
* @date 2023-01-21 10:25:57 春节
* @description 用于 Typora 的图像上传, custom command: pnpm dlx typora-image-cli
*/
import type fs from 'node:fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

interface ImageResponse {
  url: string
  message: string
}

interface ImageRequest {
  binary: fs.ReadStream
  filename: string
}

export async function uploadImages(images: ImageRequest[]) {
  return Promise.all(images.map((image) => {
    const { filename, binary } = image
    const date = new Date()
    const datePrefix = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
    const formData = new FormData()
    formData.append('filename', `${datePrefix}-${filename}`)
    formData.append('file', binary)
    formData.append('auth', 'typora')
    return fetch('https://www.imyangyong.com/upload', {
      method: 'post',
      body: formData,
    }).then((response) => {
      return response.json()
    }) as Promise<ImageResponse>
  }))
}
