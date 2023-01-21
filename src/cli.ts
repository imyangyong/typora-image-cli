/**
* @file typora main file
* @author Angus Yang
* @date 2023-01-21 10:25:57 春节
* @description 用于 Typora 的图像上传, custom command: pnpm dlx typora-image-cli
*/
import fs from 'node:fs'
import { uploadImages } from '.'

(async () => {
  const options = process.argv.slice(2)
  const images = options.map((path) => {
    const filePathArr = path.split('/')
    return {
      binary: fs.createReadStream(path),
      filename: filePathArr[filePathArr.length - 1],
    }
  })

  const results = await uploadImages(images)

  const onlineUrlList = results.map((result) => {
    const data = result
    if (data && data.url)
      return data.url

    return ''
  }).filter(url => !!url)

  // eslint-disable-next-line array-callback-return
  onlineUrlList.map((url) => {
    console.log(url)
  })
})()
