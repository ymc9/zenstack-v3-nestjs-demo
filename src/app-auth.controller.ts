import { Controller, Get, Inject, Post } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('api-auth')
export class AppAuthController {
  constructor(@Inject('AUTH_DB') private readonly dbService: DbService) {}

  @Get('/posts')
  getPosts() {
    return this.dbService.post.findMany();
  }

  @Post('/posts')
  createPost() {
    console.log('Handling post');
    return this.dbService.post.create({
      data: {
        title: 'Hello World',
        content: 'This is my first post',
        published: true,
      },
    });
  }
}
