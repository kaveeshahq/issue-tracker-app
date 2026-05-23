import type { StatusCount } from '../../types/issue.types';

interface Props {
  statusCounts: StatusCount[];
  total: number;
}

const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
  Open: {
    bg: 'bg-blue-50 border-blue-100',
    color: 'text-blue-600',
    icon: '🔵',
  },
  'In Progress': {
    bg: 'bg-yellow-50 border-yellow-100',
    color: 'text-yellow-600',
    icon: '🟡',
  },
  Resolved: {
    bg: 'bg-green-50 border-green-100',
    color: 'text-green-600',
    icon: '🟢',
  },
  Closed: {
    bg: 'bg-gray-50 border-gray-200',
    color: 'text-gray-500',
    icon: '⚪',
  },
};

const allStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

const IssueStatusCounts = ({ statusCounts, total }: Props) => {
  const getCount = (status: string) =>
    statusCounts.find((s) => s._id === status)?.count || 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {allStatuses.map((status) => {
        const config = statusConfig[status];
        const count = getCount(status);
        return (
          <div
            key={status}
            className={`rounded-xl border p-4 flex flex-col gap-1 ${config.bg}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{status}</span>
              <span className="text-lg">{config.icon}</span>
            </div>
            <span className={`text-2xl font-bold ${config.color}`}>{count}</span>
            <span className="text-xs text-gray-400">
              {total > 0 ? Math.round((count / total) * 100) : 0}% of total
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default IssueStatusCounts;