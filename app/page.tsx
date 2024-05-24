// import Image from "next/image"
import StravaAuthorize from "@/components/login/strava-authorize"

const Title = ({ title }: {title: string}) => {
  return (
    <div className="flex gap-3 items-center text-foreground">
      <p className="text-4xl">{title}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-9 h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
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
