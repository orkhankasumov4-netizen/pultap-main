import { Skeleton } from "@/components/ui/skeleton";

export const PageFallback = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-10 w-3/4 sm:w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-full sm:w-2/3" />
        <Skeleton className="h-4 w-5/6 sm:w-1/2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 border border-border p-6 rounded-xl">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
};
