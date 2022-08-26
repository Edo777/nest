import { BadRequestException, PipeTransform } from '@nestjs/common';

export class UUIDValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value.length < 35) {
      throw new BadRequestException('Wrong id');
    }

    return value;
  }
}
