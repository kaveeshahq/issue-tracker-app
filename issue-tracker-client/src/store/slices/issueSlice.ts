import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IssueState, CreateIssuePayload, UpdateIssuePayload } from '../../types/issue.types';
import { issueService } from '../../services/issueService';

const initialState: IssueState = {
  issues: [],
  selectedIssue: null,
  filters: { search: '', status: '', priority: '', severity: '' },
  pagination: { total: 0, page: 1, pages: 1 },
  statusCounts: [],
  loading: false,
  error: null,
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchAll',
  async (params: Record<string, string | number> | undefined, { rejectWithValue }) => {
    try {
      const res = await issueService.getIssues(params);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch issues');
    }
  }
);

export const fetchIssue = createAsyncThunk(
  'issues/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await issueService.getIssue(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch issue');
    }
  }
);

export const createIssue = createAsyncThunk(
  'issues/create',
  async (payload: CreateIssuePayload, { rejectWithValue }) => {
    try {
      const res = await issueService.createIssue(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create issue');
    }
  }
);

export const updateIssue = createAsyncThunk(
  'issues/update',
  async ({ id, payload }: { id: string; payload: UpdateIssuePayload }, { rejectWithValue }) => {
    try {
      const res = await issueService.updateIssue(id, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update issue');
    }
  }
);

export const deleteIssue = createAsyncThunk(
  'issues/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await issueService.deleteIssue(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete issue');
    }
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<IssueState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { search: '', status: '', priority: '', severity: '' };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearSelectedIssue: (state) => {
      state.selectedIssue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchIssues.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.issues = action.payload.issues;
        state.statusCounts = action.payload.statusCounts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchIssues.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIssue.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedIssue = action.payload;
      })
      .addCase(createIssue.fulfilled, (state, action: PayloadAction<any>) => {
        state.issues.unshift(action.payload);
      })
      .addCase(updateIssue.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.issues.findIndex(i => i._id === action.payload._id);
        if (index !== -1) state.issues[index] = action.payload;
        if (state.selectedIssue?._id === action.payload._id) state.selectedIssue = action.payload;
      })
      .addCase(deleteIssue.fulfilled, (state, action: PayloadAction<any>) => {
        state.issues = state.issues.filter(i => i._id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters, setPage, clearSelectedIssue } = issueSlice.actions;
export default issueSlice.reducer;