import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/baseModule/baseService';
import { Novel } from './entities/novel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelContent } from './entities/novelContent.entity';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class NovelService extends BaseService<Novel> {
  constructor(
    @InjectRepository(Novel)
    private readonly novelRepository: Repository<Novel>,
    private readonly userSerivce: UserService,
    private readonly emailService: EmailService,
  ) {
    super(novelRepository);
  }
}

@Injectable()
export class NovelContentService extends BaseService<NovelContent>{
  constructor(
    @InjectRepository(NovelContent)
    private readonly novelContentRepository: Repository<NovelContent>,
    private readonly novelService: NovelService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {
    super(novelContentRepository);
  }
}