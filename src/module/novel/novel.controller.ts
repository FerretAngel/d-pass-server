import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';

@Controller('novel')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

}
