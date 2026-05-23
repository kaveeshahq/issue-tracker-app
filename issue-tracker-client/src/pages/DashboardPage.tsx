import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchIssues, createIssue, updateIssue, deleteIssue } from '../store/slices/issueSlice';
import { setFilters, clearFilters, setPage } from '../store/slices/issueSlice';
import { useDebounce } from '../hooks/useDebounce';
import { Button, Modal, ConfirmDialog, Pagination } from '../components/ui';
import IssueStatusCounts from '../components/issues/IssueStatusCounts';
import IssueFilters from '../components/issues/IssueFilters';
import IssueTable from '../components/issues/IssueTable';
import IssueForm from '../components/issues/IssueForm';
import ExportButton from '../components/issues/ExportButton';
import type { Issue, CreateIssuePayload, UpdateIssuePayload } from '../types/issue.types';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { issues, statusCounts, pagination, filters, loading } = useAppSelector((state) => state.issues);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 500);

  const loadIssues = useCallback(() => {
    dispatch(fetchIssues({
      search: debouncedSearch,
      status: filters.status,
      priority: filters.priority,
      severity: filters.severity,
      page: pagination.page,
      limit: 10,
    }));
  }, [dispatch, debouncedSearch, filters.status, filters.priority, filters.severity, pagination.page]);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const handleCreate = async (data: CreateIssuePayload | UpdateIssuePayload) => {
    setFormLoading(true);
    const result = await dispatch(createIssue(data as CreateIssuePayload));
    if (createIssue.fulfilled.match(result)) {
      toast.success('Issue created!');
      setIsFormOpen(false);
      loadIssues();
    } else {
      toast.error('Failed to create issue');
    }
    setFormLoading(false);
  };

  const handleUpdate = async (data: CreateIssuePayload | UpdateIssuePayload) => {
    if (!editingIssue) return;
    setFormLoading(true);
    const result = await dispatch(updateIssue({ id: editingIssue._id, payload: data as UpdateIssuePayload }));
    if (updateIssue.fulfilled.match(result)) {
      toast.success('Issue updated!');
      setEditingIssue(null);
      loadIssues();
    } else {
      toast.error('Failed to update issue');
    }
    setFormLoading(false);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    const result = await dispatch(deleteIssue(deletingId));
    if (deleteIssue.fulfilled.match(result)) {
      toast.success('Issue deleted!');
      setDeletingId(null);
      loadIssues();
    } else {
      toast.error('Failed to delete issue');
    }
    setDeleteLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {pagination.total} total issue{pagination.total !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <ExportButton />
          <Button onClick={() => setIsFormOpen(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Issue
          </Button>
        </div>
      </div>

      {/* Status Counts */}
      <IssueStatusCounts statusCounts={statusCounts} total={pagination.total} />

      {/* Filters */}
      <IssueFilters
        search={filters.search}
        status={filters.status}
        priority={filters.priority}
        severity={filters.severity}
        onSearchChange={(val) => dispatch(setFilters({ search: val }))}
        onFilterChange={(key, val) => dispatch(setFilters({ [key]: val }))}
        onClear={() => dispatch(clearFilters())}
      />

      {/* Table */}
      <IssueTable
        issues={issues}
        loading={loading}
        onEdit={(issue) => setEditingIssue(issue)}
        onDelete={(id) => setDeletingId(id)}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={(page) => dispatch(setPage(page))}
      />

      {/* Create Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Create New Issue"
        size="lg"
      >
        <IssueForm
          onSubmit={handleCreate}
          onCancel={() => setIsFormOpen(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingIssue}
        onClose={() => setEditingIssue(null)}
        title="Edit Issue"
        size="lg"
      >
        <IssueForm
          issue={editingIssue}
          onSubmit={handleUpdate}
          onCancel={() => setEditingIssue(null)}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Issue"
        message="Are you sure you want to delete this issue? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
        loading={deleteLoading}
      />
    </div>
  );
};

export default DashboardPage;