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
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<TData> extends ApiResponse<TData[]> {
  pagination: PaginationMeta;
}