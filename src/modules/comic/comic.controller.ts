import { Controller } from '@nestjs/common';
import { ComicService } from './comic.service';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}
}
