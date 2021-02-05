import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(
      redisIoAdapter.createAdapter(
        `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      ),
    );
    return server;
  }
}
