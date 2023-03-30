import { DatabaseError } from '../types/database.error';
import { PrismaClientError } from '../types/prismaClient.error';
import { UniqueConstraintError } from '../types/uniqueConstraint.error';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
