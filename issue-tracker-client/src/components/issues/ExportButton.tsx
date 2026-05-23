import { Button } from '../ui';
import { exportToJson } from '../../utils/exportToJson';
import { issueService } from '../../services/issueService';
import type { Issue } from '../../types/issue.types';
import toast from 'react-hot-toast';
import { useState } from 'react';

const ExportButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const res = await issueService.exportIssues();
      exportToJson(res.data as Issue[], 'issues');
      toast.success('Issues exported successfully!');
    } catch {
      toast.error('Failed to export issues');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" size="md" loading={loading} onClick={handleExport}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export JSON
    </Button>
  );
};

export default ExportButton;