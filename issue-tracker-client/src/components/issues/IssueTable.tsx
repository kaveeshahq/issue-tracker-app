import { useNavigate } from 'react-router-dom';
import type { Issue } from '../../types/issue.types';
import { Badge, Spinner } from '../ui';
import { statusColors, priorityColors, severityColors } from '../../utils/statusColors';

interface Props {
  issues: Issue[];
  loading: boolean;
  onEdit: (issue: Issue) => void;
  onDelete: (id: string) => void;
}

const IssueTable = ({ issues, loading, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  if (loading) {
    return <Spinner className="py-20" size="lg" />;
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
        <div className="text-5xl mb-3">📭</div>
        <p className="text-gray-500 font-medium">No issues found</p>
        <p className="text-gray-400 text-sm mt-1">Create your first issue to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Priority</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Severity</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Created</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/issues/${issue._id}`)}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 truncate max-w-xs">{issue.title}</p>
                  {issue.description && (
                    <p className="text-gray-400 text-xs truncate max-w-xs mt-0.5">{issue.description}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge label={issue.status} colorClass={statusColors[issue.status]} />
                </td>
                <td className="px-4 py-3">
                  <Badge label={issue.priority} colorClass={priorityColors[issue.priority]} />
                </td>
                <td className="px-4 py-3">
                  <Badge label={issue.severity} colorClass={severityColors[issue.severity]} />
                </td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onEdit(issue)}
                      className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 hover:text-indigo-700 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(issue._id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueTable;