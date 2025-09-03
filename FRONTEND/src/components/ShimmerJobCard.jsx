export const SkeletonJobCard = () => {
  return (
    <div className="animate-pulse rounded-xl border p-4 bg-white shadow space-y-3">
      {/* Icon and Title */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-6 bg-gray-300 rounded-full ml-auto" />
      </div>

      {/* Metadata */}
      <div className="flex items-center flex-wrap gap-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>

      {/* Requirements */}
      <div>
        <div className="h-3 w-24 bg-gray-300 mb-1 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
      </div>

      {/* Timestamp */}
      <div className="h-3 w-32 bg-gray-200 rounded mt-2" />
    </div>
  );
};
