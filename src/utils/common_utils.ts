import { Response } from 'express';

exports.notSupported = (res: Response) => {
  res.status(403);
  res.end('Operation not supported');
};

exports.sendResponse = (res: Response, data: Object) => {
  res.status(200).contentType('application/json').json(data);
};
