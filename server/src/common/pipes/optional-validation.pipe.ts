import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { NOTHING_PASSED } from 'common/constants/error';

@Injectable()
export class OptionalValidationPipe implements PipeTransform {
  transform(value: unknown) {
    if (Object.keys(value).length < 1) {
      throw new BadRequestException(NOTHING_PASSED);
    }
    return value;
  }
}
