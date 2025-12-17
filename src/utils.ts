import type { Request } from 'express';

export function isAdmin(req: Request) {
  const adminHeader = req.headers['x-admin'];
  return adminHeader === '1' || adminHeader === 'true';
}
