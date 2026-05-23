import { Input } from '../ui';

interface Props {
  search: string;
  status: string;
  priority: string;
  severity: string;
  onSearchChange: (val: string) => void;
  onFilterChange: (key: string, val: string) => void;
  onClear: () => void;
}

const IssueFilters = ({
  search, status, priority, severity,
  onSearchChange, onFilterChange, onClear,
}: Props) => {
  const hasFilters = search || status || priority || severity;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      <select
        value={status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => onFilterChange('priority', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      <select
        value={severity}
        onChange={(e) => onFilterChange('severity', e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700"
      >
        <option value="">All Severity</option>
        <option value="Minor">Minor</option>
        <option value="Major">Major</option>
        <option value="Critical">Critical</option>
        <option value="Blocker">Blocker</option>
      </select>

      {hasFilters && (
        <button
          onClick={onClear}
          className="px-3 py-2 text-sm text-red-500 hover:text-red-700 font-medium whitespace-nowrap"
        >
          Clear ✕
        </button>
      )}
    </div>
  );
};

export default IssueFilters;