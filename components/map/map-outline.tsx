export default function ActivityMapOutline({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}