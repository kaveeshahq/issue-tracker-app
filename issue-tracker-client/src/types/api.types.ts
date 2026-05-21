export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  issues: T[];
  statusCounts: { _id: string; count: number }[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}