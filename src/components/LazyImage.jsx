import { useState } from 'react';
import SampleBadge from './SampleBadge';

export default function LazyImage({ src, alt, className = '', imageSource, showBadge = true, ...props }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-dark-800 flex items-center justify-center text-dark-500 text-sm ${className}`} {...props}>
        <span>Add photo here</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {showBadge && <SampleBadge source={imageSource} />}
      <img src={src} alt={alt} loading="lazy" className={className} onError={() => setError(true)} {...props} />
    </div>
  );
}
