import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { MultipartFile } from '@fastify/multipart'

import dayjs from 'dayjs'

import { generateShortUUID } from './tool.util'

export enum Type {
  IMAGE = 'Images',
  TXT = 'document',
  MUSIC = 'music',
  VIDEO = 'video',
  OTHER = 'other',
}

export function getFileType(extName: string) {
  const documents = 'txt doc pdf ppt pps xlsx xls docx'
  const music = 'mp3 wav wma mpa ram ra aac aif m4a'
  const video = 'avi mpg mpe mpeg asf wmv mov qt rm mp4 flv m4v webm ogv ogg'
  const image
    = 'bmp dib pcp dif wmf gif jpg tif eps psd cdr iff tga pcd mpt png jpeg webp'
  if (image.includes(extName))
    return Type.IMAGE

  if (documents.includes(extName))
    return Type.TXT

  if (music.includes(extName))
    return Type.MUSIC

  if (video.includes(extName))
    return Type.VIDEO

  return Type.OTHER
}

export function getName(fileName: string) {
  if (fileName.includes('.'))
    return fileName.split('.')[0]

  return fileName
}

export function getExtname(fileName: string) {
  return path.extname(fileName).replace('.', '')
}

export function getSize(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export function fileRename(fileName: string) {
  // const name = fileName.split('.')[0]
  const extName = path.extname(fileName)
  const time = dayjs().format('YYYY_MM_DD_HHmmSSS')
  return `${generateShortUUID().toUpperCase()}_${time}${extName}`
}

export function getFilePath(name: string, currentDate: string, type: string) {
  return `/upload/${currentDate}/${type}/${name}`
}

export async function saveLocalFile(buffer: Buffer, name: string, currentDate: string, type: string) {
  const filePath = path.join(__dirname, '../../', 'public/upload/', `${currentDate}/`, `${type}/`)
  try {
    // 判断是否有该文件夹
    await fs.promises.stat(filePath)
  }
  catch (error) {
    // 没有该文件夹就创建
    await fs.promises.mkdir(filePath, { recursive: true })
  }
  const writeStream = fs.createWriteStream(filePath + name)
  writeStream.write(buffer)
}

export async function saveFile(file: MultipartFile, name: string) {
  const filePath = path.join(__dirname, '../../', 'public/upload', name)
  const writeStream = fs.createWriteStream(filePath)
  const buffer = await file.toBuffer()
  writeStream.write(buffer)
}

export async function deleteFile(name: string) {
  fs.unlink(path.join(__dirname, '../../', 'public', name), () => {
    // console.log(error);
  })
}
export function getCommand(type: string, orginUrl: string, webpUrl: string, quliaity = 100) {
  const reallyOriginUrl = path.join(__dirname, '../../', 'public', orginUrl)
  const reallywebpUrl = path.join(__dirname, '../../', 'public', webpUrl)
  switch (type) {
    // case 'webp':
    //   return `cp ${orginUrl} ${webpUrl}`;
    case 'gif':
      return `ffmpeg -i ${reallyOriginUrl} -c:v libwebp -loop 0 -lossless ${
        quliaity / 100
      } ${reallywebpUrl} -y`
    default:
      return `ffmpeg -i ${reallyOriginUrl} -q:v ${quliaity} ${reallywebpUrl} -y`
  }
}

export function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        console.error(err)
        reject(
          new Error(
            `转换图片失败:${command.replaceAll('\\', '/')}，错误信息:${stdout}`,
          ),
        )
      }
      resolve(true)
    })
  })
}

export function imageToWebp(orginUrl: string, webpUrl: string) {
  return new Promise(async (resolve, reject) => {
    const type = path.extname(orginUrl).slice(1)
    const command = getCommand(type, orginUrl, webpUrl)
    exec(command, (err, stdout) => {
      if (err) {
        console.error(err)
        reject(new Error(`转换图片失败:${command}，错误信息:${stdout}`))
      }
      resolve(true)
    })
  })
}