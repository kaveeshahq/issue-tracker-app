import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchIssue, updateIssue, deleteIssue } from '../store/slices/issueSlice';
import { Button, Badge, Modal, ConfirmDialog, Spinner } from '../components/ui';
import IssueForm from '../components/issues/IssueForm';
import { statusColors, priorityColors, severityColors } from '../utils/statusColors';
import type { UpdateIssuePayload, CreateIssuePayload } from '../types/issue.types';
import toast from 'react-hot-toast';

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedIssue, loading } = useAppSelector((state) => state.issues);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchIssue(id));
  }, [id, dispatch]);

  const handleUpdate = async (data: CreateIssuePayload | UpdateIssuePayload) => {
    if (!selectedIssue) return;
    setFormLoading(true);
    const result = await dispatch(updateIssue({ id: selectedIssue._id, payload: data as UpdateIssuePayload }));
    if (updateIssue.fulfilled.match(result)) {
      toast.success('Issue updated!');
      setIsEditOpen(false);
    } else {
      toast.error('Failed to update issue');
    }
    setFormLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedIssue) return;
    setDeleteLoading(true);
    const result = await dispatch(deleteIssue(selectedIssue._id));
    if (deleteIssue.fulfilled.match(result)) {
      toast.success('Issue deleted!');
      navigate('/');
    } else {
      toast.error('Failed to delete issue');
    }
    setDeleteLoading(false);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedIssue) return;
    const result = await dispatch(updateIssue({
      id: selectedIssue._id,
      payload: { status: status as UpdateIssuePayload['status'] },
    }));
    if (updateIssue.fulfilled.match(result)) {
      toast.success(`Status updated to ${status}`);
    }
  };

  if (loading) return <Spinner className="py-32" size="lg" />;

  if (!selectedIssue) {
    return (
      <div className="text-center py-32">
        <p className="text-gray-500">Issue not found</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{selectedIssue.title}</h1>
            <p className="text-xs text-gray-400 mt-1">
              Created on {new Date(selectedIssue.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="secondary" size="sm" onClick={() => setIsEditOpen(true)}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsDeleteOpen(true)}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Status</span>
            <Badge label={selectedIssue.status} colorClass={statusColors[selectedIssue.status]} size="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Priority</span>
            <Badge label={selectedIssue.priority} colorClass={priorityColors[selectedIssue.priority]} size="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Severity</span>
            <Badge label={selectedIssue.severity} colorClass={severityColors[selectedIssue.severity]} size="md" />
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedIssue.description || <span className="text-gray-400 italic">No description provided.</span>}
          </p>
        </div>

        {/* Quick Status Change */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Quick Status Update</p>
          <div className="flex flex-wrap gap-2">
            {(['Open', 'In Progress', 'Resolved', 'Closed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedIssue.status === status
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Issue" size="lg">
        <IssueForm
          issue={selectedIssue}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete Issue"
        message="Are you sure you want to delete this issue? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        loading={deleteLoading}
      />
    </div>
  );
};

export default IssueDetailPage;