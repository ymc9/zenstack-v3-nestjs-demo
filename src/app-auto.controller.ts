import {
  All,
  Controller,
  Inject,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { RestApiHandler } from '@zenstackhq/server/api';
import type { Request, Response } from 'express';
import { DbService } from './db.service';
import { schema } from './zenstack/schema';

// This controller uses ZenStack API handler to automatically provide REST API with access control
@Controller('api-auto')
export class AppAutoController {
  private readonly apiHandler = new RestApiHandler({
    schema,
    endpoint: 'http://localhost:3000/api-auto',
  });

  constructor(@Inject('AUTH_DB') private readonly dbService: DbService) {}

  @All('/*path')
  async handleAll(
    @Req() req: Request,
    @Res() response: Response,
    @Param('path') path: string[],
    @Query() query: Record<string, any>,
  ) {
    const result = await this.apiHandler.handleRequest({
      method: req.method,
      path: path.join('/'),
      query,
      requestBody: req.body,
      client: this.dbService,
    });

    response.status(result.status).json(result.body);
  }
}
