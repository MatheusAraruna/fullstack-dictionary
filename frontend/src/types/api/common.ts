/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<TData = any> {
  data: TData;
  message?: string;
  success: boolean;
}

export interface ApiError {
  errKey: string;
  message: string;
  friendlyMessage: string;
  details?: any;
}

export interface PaginationParams {
  cursor?: string;
  limit?: number;
  orientation?: 'asc' | 'desc';
}

export interface PaginationMeta {
  previous: string;
  next: string;
  hasNext: boolean;
  hasPrevious: boolean;
  totalDocs: number;
}

export interface PaginatedResponse<TData> extends ApiResponse<TData[]> {
  pagination: PaginationMeta;
}