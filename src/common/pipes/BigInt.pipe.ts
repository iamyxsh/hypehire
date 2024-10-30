import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class BigIntTransformPipe implements PipeTransform {
  transform(value: string): bigint {
    try {
      return BigInt(value);
    } catch (error) {
      console.log('error ->', error);
      throw new BadRequestException(`Invalid bigint value: ${value}`);
    }
  }
}
