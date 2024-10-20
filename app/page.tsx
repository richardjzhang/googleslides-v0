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

const presentationTemplates = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/presentation-image-1-7fzxiIut4ZE9h7D8EOSIBobNH9WPcT.png",
    title: "Blank presentation",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/presentation-section-image-2-YWsQo0icQ4wgy0RcuCrIc7SM3a51Vw.png",
    title: "Prototyping presentation",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/presentation-section-image-3-lPjX6TVQ8P9foRxf8K7gfT6GOz01Lm.png",
    title: "Consulting proposal",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/presentation-section-image-4-QKqARFAy0pX01xpnSyVRU3xtK6tspR.png",
    title: "Pitch",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/presentation-image-5-KjkdhoxjTL9Ywn2Q4bKnYXTEECSpfI.png",
    title: "Project Wireframes",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google-slides-logo-4ZwCeJHKVIn4dlEwgvJMBtOyZcL0wO.webp"
              width={32}
              height={32}
              alt="Google Slides logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-gray-700">Slides</span>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-8 bg-gray-100" />
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
              { title: "Sydney v0 Presentation", link: "/sydney" },
              { title: "London v0 Presentation", link: "/london" },
              { title: "San Francisco v0 Presentation", link: "/" },
              { title: "New York v0 Presentation", link: "/" },
              { title: "Next.js Conf presentation slides", link: "/" },
            ].map((presentation, index) => (
              <Link
                href={presentation.link}
                key={index}
                className="block hover:bg-gray-100 rounded-lg"
              >
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202024-10-18%20at%2000.24.43@2x-p1L8AyMiT0SfcEvTznrmdCcttAsYNB.png"
                      width={20}
                      height={20}
                      alt="Slides icon"
                      className="w-5 h-5"
                    />
                    <span>{presentation.title}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
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
