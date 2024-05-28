"use client"


export default function MetricsOutline({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      {children}
    </div>
  )
}