import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MenuIcon,
  Search,
  MoreVertical,
  Grid,
  SortAsc,
  Folder,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { presentationTemplates } from "@/app/constants/presentation-templates";
import { londonSlidesTitle } from "@/app/constants/london-slides";
import { sydneySlidesTitle } from "@/app/constants/sydney-slides";
import { londonV0SummitSlidesTitle } from "@/app/constants/london-v0-summit";
import { v0SlidesTitle } from "@/app/constants/v0-slide-deck";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Image
              src="/general/google-slides-logo.png"
              width={32}
              height={44}
              alt="Google Slides logo"
            />
            <span className="text-3xl font-medium text-gray-700">Slides</span>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex items-center">
            <Search className="h-4 w-4 text-gray-400 -mr-7 z-10" />
            <Input
              placeholder="Search"
              className="pl-10 bg-gray-100 h-[48px] w-full rounded-full text-lg font-normal"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Grid className="h-5 w-5" />
          </Button>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vercel-icon-dark-sHMHjxrAuueV7ogJoJr8eu1Qh5MRZP.svg"
            width={30}
            height={24}
            alt="Vercel logo"
          />
        </div>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Start a new presentation</h2>
            <Button variant="ghost" size="sm">
              Template gallery
              <MoreVertical className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {presentationTemplates.map((template, index) => (
              <div key={index} className="flex flex-col">
                <div className="aspect-video bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={template.image}
                    width={300}
                    height={169}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-center text-gray-600">
                  {template.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent presentations</h2>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Owned by anyone
                <MoreVertical className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="ghost" size="sm">
                Last opened by me
              </Button>
              <Button variant="ghost" size="icon">
                <Grid className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <SortAsc className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Folder className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { title: sydneySlidesTitle, link: "/sydney" },
              { title: londonSlidesTitle, link: "/london" },
              { title: v0SlidesTitle, link: "/v0-slide-deck" },
              { title: londonV0SummitSlidesTitle, link: "/london-v0-summit" },
              { title: "New York v0 Presentation", link: "/" },
              { title: "Next.js Conf presentation slides", link: "/" },
            ].map((presentation, index) => (
              <Link
                href={presentation.link}
                key={index}
                className="block hover:bg-gray-100 rounded-lg"
              >
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202024-10-18%20at%2000.24.43@2x-p1L8AyMiT0SfcEvTznrmdCcttAsYNB.png"
                      width={20}
                      height={20}
                      alt="Slides icon"
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium text-slate-800">
                      {presentation.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-md text-gray-500">
                    <span>me</span>
                    <span>Oct 17, 2024</span>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
