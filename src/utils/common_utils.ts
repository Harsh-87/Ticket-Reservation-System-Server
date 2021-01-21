import { Response } from 'express';

exports.notSupported = (res: Response) => {
  res.status(403);
  res.end('Operation not supported');
};
