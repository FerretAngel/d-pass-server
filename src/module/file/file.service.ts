import { Injectable } from '@nestjs/common';
import * as Path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
@Injectable()
export class FileService {
  _tempPath: string;
  _publicPath: string;
  async uploadFile(file: Express.Multer.File) {
    const tempPath = this.tempPath;
    const fileType = file.originalname.split('.').pop();
    const filePath = Path.join(tempPath, `${Date.now()}.${fileType}`);
    await this.writeFile(filePath, file.buffer);
    const webpPath = Path.join(this.tempPath, `${this.fileName}.webp`);
    await this.imageToWebp(filePath, webpPath);
    await this.deleteFile(filePath);
    return Path.basename(webpPath);
  }

  getOriginFileByName(name: string) {
    let filePath = Path.join(this.publicPath, name);
    if (!this.checkFileExist(filePath)) {
      filePath = Path.join(this.tempPath, name);
    }
    if (!this.checkFileExist(filePath)) {
      return Path.join(this.publicPath, '404.webp');
    }
    return filePath;
  }

  checkFileExist(path: string) {
    return fs.existsSync(path);
  }

  getCommand(type: string, orginUrl: string, webpUrl: string, quliaity = 100) {
    switch (type) {
      // case 'webp':
      //   return `cp ${orginUrl} ${webpUrl}`;
      case 'gif':
        return `ffmpeg -i ${orginUrl} -c:v libwebp -loop 0 -lossless ${
          quliaity / 100
        } ${webpUrl} -y`;
      default:
        return `ffmpeg -i ${orginUrl} -q:v ${quliaity} ${webpUrl} -y`;
    }
  }

  runCommand(command: string) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) {
          console.error(err);
          reject(
            new Error(
              `转换图片失败:${command.replaceAll('\\', '/')}，错误信息:${stdout}`,
            ),
          );
        }
        resolve(true);
      });
    });
  }

  imageToWebp(orginUrl: string, webpUrl: string) {
    return new Promise(async (resolve, reject) => {
      const type = Path.extname(orginUrl).slice(1);
      if (type === 'webp') {
        await this.copyFile(orginUrl, webpUrl);
        return resolve(true);
      }
      const command = this.getCommand(type, orginUrl, webpUrl);
      exec(command, (err, stdout) => {
        if (err) {
          console.error(err);
          reject(`转换图片失败:${command}，错误信息:${stdout}`);
        }
        resolve(true);
      });
    });
  }

  get tempPath() {
    if (this._tempPath) return this._tempPath;
    const tempPath = this.getPath('/temp');
    this._tempPath = tempPath;
    return this._tempPath;
  }

  get publicPath() {
    if (this._publicPath) return this._publicPath;
    const publicPath = this.getPath('/public');
    this._publicPath = publicPath;
    return this._publicPath;
  }

  getTempPath(name: string) {
    const path = Path.join(this.tempPath, name);
    this.checkPath(path);
    return path;
  }
  pathJoin(...paths: string[]) {
    return Path.join(...paths);
  }

  get fileName() {
    return `WEBP_${Math.random().toString(36).slice(2).toUpperCase()}`;
  }

  getPath(path: string) {
    const paths = path.split('/');
    const _path = Path.join(__dirname, '..', '..', '..', ...paths);
    if (!fs.existsSync(_path)) {
      this.checkPath(_path);
    }
    return _path;
  }

  /**
 检查路径是否存在，不存在则创建
 * 
 * @param {*} path 
 */
  checkPath(path) {
    if (path.includes('.')) {
      path = Path.dirname(path);
    }
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  writeFile(filePath: string, data: Buffer, fileName?: string) {
    this.checkPath(filePath);
    if (fileName) {
      filePath = Path.join(filePath, fileName);
    }
    return new Promise<string>((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) reject(err);
        resolve(filePath);
      });
    });
  }

  deleteFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  moveFile(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  copyFile(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
      fs.copyFile(oldPath, newPath, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  async deleteFileByName(name: string) {
    if (name === '404.webp') return;
    const filePath = Path.join(this.publicPath, name);
    if (!this.checkFileExist(filePath)) return;
    const tempPath = this.tempPath;
    await this.moveFile(filePath, tempPath);
  }

  async moveFileByName(name: string) {
    if (name === '404.webp') return;
    const filePath = Path.join(this.tempPath, name);
    if (!this.checkFileExist(filePath)) return;
    const newPath = Path.join(this.publicPath, name);
    await this.moveFile(filePath, newPath);
  }
}
