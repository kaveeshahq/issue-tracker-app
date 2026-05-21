import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDeleteModalOpen: boolean;
  isFormModalOpen: boolean;
  deletingIssueId: string | null;
}

const initialState: UIState = {
  isDeleteModalOpen: false,
  isFormModalOpen: false,
  deletingIssueId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.isDeleteModalOpen = true;
      state.deletingIssueId = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.deletingIssueId = null;
    },
    openFormModal: (state) => { state.isFormModalOpen = true; },
    closeFormModal: (state) => { state.isFormModalOpen = false; },
  },
});

export const { openDeleteModal, closeDeleteModal, openFormModal, closeFormModal } = uiSlice.actions;
export default uiSlice.reducer;