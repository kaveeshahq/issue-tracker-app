import { useState, useEffect } from 'react';
import type { Issue, CreateIssuePayload, UpdateIssuePayload, IssuePriority, IssueSeverity, IssueStatus } from '../../types/issue.types';
import { Input, Button } from '../ui';

interface Props {
  issue?: Issue | null;
  onSubmit: (data: CreateIssuePayload | UpdateIssuePayload) => void;
  onCancel: () => void;
  loading?: boolean;
}

const IssueForm = ({ issue, onSubmit, onCancel, loading }: Props) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium' as IssuePriority,
    severity: 'Minor' as IssueSeverity,
    status: 'Open' as IssueStatus,
  });
  const [errors, setErrors] = useState({ title: '' });

  useEffect(() => {
    if (issue) {
      setForm({
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        severity: issue.severity,
        status: issue.status,
      });
    }
  }, [issue]);

  const validate = () => {
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required' });
      return false;
    }
    setErrors({ title: '' });
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  const selectClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700";

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Title *"
        placeholder="Enter issue title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        error={errors.title}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={3}
          placeholder="Describe the issue..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as IssuePriority })}
            className={selectClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Severity</label>
          <select
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value as IssueSeverity })}
            className={selectClass}
          >
            <option>Minor</option>
            <option>Major</option>
            <option>Critical</option>
            <option>Blocker</option>
          </select>
        </div>

        {issue && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as IssueStatus })}
              className={selectClass}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} loading={loading}>
          {issue ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </div>
  );
};

export default IssueForm;