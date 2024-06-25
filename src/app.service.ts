import { Injectable } from '@nestjs/common';
import { ComicService } from './module/comic/comic.service';
import { ContentService } from './module/content/content.service';
import { NovelService } from './module/novel/novel.service';
import { RoleService } from './module/role/role.service';
import { VolumeService } from './module/volume/volume.service';

type Service =
  | ComicService
  | ContentService
  | NovelService
  | RoleService
  | VolumeService;
@Injectable()
export class AppService {
  constructor(
    private readonly novelService: NovelService,
    private readonly volumeService: VolumeService,
    private readonly contentService: ContentService,
    private readonly roleService: RoleService,
    private readonly comicService: ComicService,
  ) {}

  getHello(): string {
    return 'Already connected to the D-PASS server!';
  }

  async search(input: string) {
    const key = input.trim();
    if (!key) throw new Error('请输入关键字');
    const [novel, volume, content, role, comic] = await Promise.all([
      this.novelService.search(key),
      this.volumeService.search(key),
      this.contentService.search(key),
      this.roleService.search(key),
      this.comicService.search(key),
    ]);
    return { novel, volume, content, role, comic };
  }
}
