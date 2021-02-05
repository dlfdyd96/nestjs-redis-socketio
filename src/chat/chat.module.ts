import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  providers: [ChatGateway],
  exports: [],
})
export class ChatModule {}
