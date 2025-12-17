import { Controller, Get, Post } from '@nestjs/common';
import { DbService } from './db.service';

// This controller is not access-controlled
@Controller('api')
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  getPosts() {
    return this.dbService.post.findMany();
  }

  @Post('/posts')
  createPost() {
    return this.dbService.post.create({
      data: {
        title: 'Hello World',
        content: 'This is my first post',
        published: true,
      },
    });
  }

  @Post('/drafts')
  createDraft() {
    return this.dbService.post.create({
      data: {
        title: 'Draft Post',
        content: 'This is a draft post',
        published: false,
      },
    });
  }
}
