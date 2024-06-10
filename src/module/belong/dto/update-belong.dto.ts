import { PartialType } from '@nestjs/mapped-types';
import { CreateBelongDto } from './create-belong.dto';

export class UpdateBelongDto extends PartialType(CreateBelongDto) {}
