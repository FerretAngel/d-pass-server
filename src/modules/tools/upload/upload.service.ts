import { MultipartFile } from '@fastify/multipart'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import { Repository } from 'typeorm'

import { Storage } from '~/modules/tools/storage/storage.entity'

import {
  Type,
  deleteFile,
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getSize,
  imageToWebp,
  saveLocalFile,
} from '~/utils/file.util'

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}


  /**
   * 图片转webp
   */
  async saveImage2Webp(file:MultipartFile,userId:number){

  }

  /**
   * 保存文件上传记录
   */
  async saveFile(file: MultipartFile, userId: number):Promise<Storage> {
    if (isNil(file))
      throw new NotFoundException('Have not any file to upload!')

    const fileName = file.filename
    const size = getSize(file.file.bytesRead)
    const extName = getExtname(fileName)
    const type = getFileType(extName)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const name = fileRename(fileName)
    const path = getFilePath(name, currentDate, type)

    saveLocalFile(await file.toBuffer(), name, currentDate, type)

    let tempStorage={
      name,
      fileName,
      extName,
      path,
      type,
      size,
      userId,
    }

    // 图片类型转换为webp存储
    if(type === Type.IMAGE && extName !=='webp'){
      try {
        const reg = /\.(\w+)$/
        const webpFileName = fileName.replace(reg,'.webp')
        const webpName = name.replace(reg,'.webp')
        const webpPath = path.replace(reg,'.webp')
        await imageToWebp(path,webpPath)
        // 删除原本的文件
        deleteFile(path)
        tempStorage={
          ...tempStorage,
          fileName:webpFileName,
          name:webpName,
          path:webpPath,
          extName:'webp',
        }
      } catch (error) {
        console.error(error);
      }
    }

    const storage =  await this.storageRepository.save(tempStorage)

    return storage
  }
}
