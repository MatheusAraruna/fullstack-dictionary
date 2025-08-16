import { Request } from 'express';

export type UserMetadata = {
  id: string;
  name?: string;
  email?: string;
  lastLogin?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type RequestWithUser = Request & {
  user: UserMetadata;
};
