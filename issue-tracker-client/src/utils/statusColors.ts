export const statusColors: Record<string, string> = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-100 text-gray-600',
};

export const priorityColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
};

export const severityColors: Record<string, string> = {
  Minor: 'bg-green-100 text-green-700',
  Major: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
  Blocker: 'bg-purple-100 text-purple-700',
};