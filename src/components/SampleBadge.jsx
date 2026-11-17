export default function SampleBadge({ source, className = '' }) {
  if (source === 'real' || source === 'google-maps') return null;
  return (
    <span className={`absolute top-2 left-2 bg-dark-900/80 text-dark-300 text-[10px] font-medium px-1.5 py-0.5 rounded z-10 ${className}`}>
      Sample image
    </span>
  );
}
