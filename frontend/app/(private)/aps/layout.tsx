import { Navbar } from "@/components/Navbar/Navbar";
import { PropsWithChildren } from "react";

export default function ApsLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}