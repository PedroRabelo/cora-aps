import { PartialType } from '@nestjs/mapped-types';
import { CreateCareLineDto } from './create-care-line.dto';

export class UpdateCareLineDto extends PartialType(CreateCareLineDto) {}
