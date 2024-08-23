import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ComicService } from './modules/comic/comic.service';
import { InfoService } from './modules/info/info.service';
import { NovelService } from './modules/novel/novel.service';
import { ArticleService } from './modules/article/article.service';
import { DictItemService } from './modules/system/dict-item/dict-item.service';
import { RolesService } from './modules/roles/roles.service';
import { AuthUser } from './modules/auth/decorators/auth-user.decorator';
import { Throttle } from '@nestjs/throttler';
import { BusinessException } from './common/exceptions/biz.exception';



@Controller()
@ApiTags('App-模块')
export class AppController {
  constructor(
    private readonly novelService: NovelService,
    private readonly articalService: ArticleService,
    private readonly roleService: RolesService,
    private readonly comicService: ComicService,
    private readonly infoService: InfoService,
    private readonly dictItemService:DictItemService
  ) { }

  @Get('search/:key')
  @ApiOperation({ summary: '全局搜索' })
  @Throttle({default:{ttl:1000,limit:1}})
  async search(@Param('key') key: string,@AuthUser() user: IAuthUser) {
    if(!key) throw new BusinessException('400:搜索词为空')
    // 添加搜索记录
    this.dictItemService.create({
      typeId:2,
      label:`UID:${user.uid}`,
      value:key,
    })
    const [novel, volume, artical, role, comic, info] = await Promise.all([
      this.novelService.search(key),
      this.articalService.searchParent(key),
      this.articalService.search(key),
      this.roleService.search(key),
      this.comicService.search(key),
      this.infoService.search(key),
    ]);
    return { novel, volume, artical, role, comic, info };
  }
}