import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  ping(): string {
    return 'pong';
  }
}
