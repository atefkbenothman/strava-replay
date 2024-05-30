import { ReplayIcon } from "@/components/svgs/icons"
import StravaAuthorize from "@/components/login/strava-authorize"

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-3 items-center text-foreground">
      <p className="text-4xl">{title}</p>
      <ReplayIcon />
    </div>
  )
}

const Footer = () => {
  return (
    <div className="flex p-2 items-center justify-center text-muted-foreground text-sm gap-1">
      <p>made by</p>
      <p className="font-medium">Atef Kai Benothman</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-background">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col w-full h-full items-center justify-center text-foreground">
          <div className="flex flex-col gap-6 border-2 border-secondary p-8 rounded bg-backgroundVariant">
            <Title title="Strava-Replay" />
            <StravaAuthorize />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
