import { Injectable } from '@nestjs/common';
import { ComicService } from './module/comic/comic.service';
import { ContentService } from './module/content/content.service';
import { NovelService } from './module/novel/novel.service';
import { RoleService } from './module/role/role.service';
import { VolumeService } from './module/volume/volume.service';
import { InfoService } from './module/info/info.service';
import { SystemService } from './module/system/system.service';
import { SystemType } from './module/system/entities/system.entity';
@Injectable()
export class AppService {
  constructor(
    private readonly novelService: NovelService,
    private readonly volumeService: VolumeService,
    private readonly contentService: ContentService,
    private readonly roleService: RoleService,
    private readonly comicService: ComicService,
    private readonly infoService: InfoService,
    private readonly systemService: SystemService,
  ) {}

  getHello(): string {
    return 'Already connected to the D-PASS server!';
  }

  async search(input: string) {
    const key = input.trim();
    if (!key) throw new Error('请输入关键字');
    // 添加搜索记录
    this.systemService.createItem({
      type: SystemType.SEARCH_KEY,
      content: key,
      default: false,
      enable: true,
    });
    const [novel, volume, content, role, comic, info] = await Promise.all([
      this.novelService.search(key),
      this.volumeService.search(key),
      this.contentService.search(key),
      this.roleService.search(key),
      this.comicService.search(key),
      this.infoService.search(key),
    ]);
    return { novel, volume, content, role, comic, info };
  }
}
