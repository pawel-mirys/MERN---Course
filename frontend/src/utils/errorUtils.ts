import { CustomError } from '@/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Error = FetchBaseQueryError | SerializedError | any;

const handleError = (error: Error) => {
  if ('status' in error) {
    const errorMessage: string =
      'error' in error
        ? error.error
        : JSON.stringify((error as unknown as CustomError).data?.message);
    return errorMessage;
  }
};

export default handleError;
