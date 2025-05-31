import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 bg-white shadow-sm">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="md:col-span-2 relative bg-gray-100">
          <Skeleton className="h-full w-full" />
          <div className="absolute bottom-16 right-4">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>

        <div className="p-4 bg-white overflow-y-auto">
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
