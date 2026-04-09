/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-md ${className}`} 
    />
  );
};

export const MessageSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 w-full py-4">
      {/* Left Message (Received) */}
      <div className="flex items-end gap-3 max-w-[80%]">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-16 w-full rounded-2xl rounded-bl-none" />
        </div>
      </div>

      {/* Right Message (Sent) */}
      <div className="flex justify-end w-full">
        <div className="flex flex-col items-end gap-2 max-w-[70%] w-full">
          <Skeleton className="h-12 w-full rounded-2xl rounded-tr-none bg-zinc-300 dark:bg-zinc-700" />
          <Skeleton className="h-3 w-16 rounded-full" />
        </div>
      </div>

      {/* Left Message (Received) - Short */}
      <div className="flex items-end gap-3 max-w-[60%]">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-10 w-full rounded-2xl rounded-bl-none" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
