export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueSeverity = 'Minor' | 'Major' | 'Critical' | 'Blocker';

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  search: string;
  status: string;
  priority: string;
  severity: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export interface StatusCount {
  _id: string;
  count: number;
}

export interface IssueState {
  issues: Issue[];
  selectedIssue: Issue | null;
  filters: IssueFilters;
  pagination: Pagination;
  statusCounts: StatusCount[];
  loading: boolean;
  error: string | null;
}

export interface CreateIssuePayload {
  title: string;
  description?: string;
  priority?: IssuePriority;
  severity?: IssueSeverity;
}

export interface UpdateIssuePayload {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  severity?: IssueSeverity;
}