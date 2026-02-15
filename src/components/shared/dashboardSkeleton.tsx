export function DashboardSkeleton() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* 1. Navbar Skeleton */}
      <nav className="h-16 border-b  flex items-center justify-between px-8">
        <div className="flex items-center space-x-6">
          {/* Logo Circle */}
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </nav>

      {/* 2. Main Content Skeleton */}
      <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Page Title Placeholder */}
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />

        {/* 3. Card Grid (Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className=" p-6 rounded-xl border border-gray-100 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* 4. Large Content Area Skeleton */}
        <div className="w-full  p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
