interface BadgeProps {
  label: string;
  colorClass: string;
  size?: 'sm' | 'md';
}

const Badge = ({ label, colorClass, size = 'sm' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        ${colorClass}
      `}
    >
      {label}
    </span>
  );
};

export default Badge;