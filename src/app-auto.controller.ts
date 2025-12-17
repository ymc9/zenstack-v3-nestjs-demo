import { All, Controller, Param, Query, Req, Res } from '@nestjs/common';
import { RestApiHandler } from '@zenstackhq/server/api';
import type { Request, Response } from 'express';
import { DbService } from './db.service';
import { isAdmin } from './utils';
import { schema } from './zenstack/schema';

// This controller uses ZenStack API handler to automatically provide REST API with access control
@Controller('api-auto')
export class AppAutoController {
  private readonly apiHandler = new RestApiHandler({
    schema,
    endpoint: 'http://localhost:3000/api-auto',
  });

  constructor(private readonly dbService: DbService) {}

  @All('/*path')
  async handleAll(
    @Req() req: Request,
    @Res() response: Response,
    @Param('path') path: string[],
    @Query() query: Record<string, any>,
  ) {
    // simulate authentication
    const admin = isAdmin(req);
    const authDb = this.dbService.$setAuth({ admin });

    const result = await this.apiHandler.handleRequest({
      method: req.method,
      path: path.join('/'),
      query,
      requestBody: req.body,
      client: authDb,
    });

    response.status(result.status).json(result.body);
  }
}
