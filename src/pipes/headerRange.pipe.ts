import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class HeaderRangePipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      throw new BadRequestException('Requires Range Header');
    }

    return value;
  }
}
