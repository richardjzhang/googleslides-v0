"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Hand,
  Type,
  Shapes,
  LayoutGrid,
  Palette,
  Undo,
  Redo,
  MoreVertical,
  Search,
  Printer,
  ZoomIn,
  MousePointer2,
  MessageSquare,
  Share2,
} from "lucide-react";

interface Slide {
  id: number;
  content: string;
  image?: string;
  images?: string[];
  video?: {
    src: string;
    link: string;
  };
  videos?: {
    src: string;
    link: string;
  }[];
  background: string;
}

export default function GoogleSlidesCloneComponent() {
  const slides = [
    { id: 1, background: "/slide-backgrounds/slide-1.png" },
    {
      id: 2,
      background: "/slide-backgrounds/slide-2.png",
    },
    {
      id: 3,
      background: "/slide-backgrounds/slide-3.png",
    },
    {
      id: 4,
      image: "/v0-logo.png",
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 5,
      background: "/slide-backgrounds/slide-5.png",
    },
    {
      id: 6,
      background: "/slide-backgrounds/slide-6.png",
    },
    {
      id: 7,
      background: "/slide-backgrounds/slide-7.png",
    },
    {
      id: 8,
      background: "/slide-backgrounds/slide-8.png",
    },
    {
      id: 9,
      content: "Next.js Expert",
      image: "/nextjs-expert.png",
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 10,
      content: "Quick Prototyping",
      image: "",
      video: { src: "/v0-demo.mp4", link: "https://v0.dev/chat/b/SS0Vu4l" },
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 11,
      content: "Complex Visualisations",
      videos: [
        { src: "/greta-cube.mp4", link: "https://gretagoestoconf.v0.build/" },
        { src: "/rubiks-cube.mp4", link: "https://b_affrprp8xi6.v0.build/" },
      ],
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 12,
      content: "Cloning Machine",
      image: "/landing-page.png",
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 13,
      content: "Supports Libraries",
      video: {
        src: "/amex-card.mp4",
        link: "https://amex-demo.v0.build/",
      },
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 14,
      content: "Fast & Efficient changes",
      image: "/nextjs-expert.png",
      background: "/slide-backgrounds/slides-background.webp",
    },
    {
      id: 15,
      content: "Personalised Software",
      // https://vercel-logo-html.v0.build/
    },
    {
      id: 16,
      content: "Complex State Management",
      images: ["/flappy-bird.png", "/tetris.png"],
      background: "/slide-backgrounds/slides-background.webp",
    },
  ] as Slide[];

  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [title, setTitle] = useState("v0 Examples");
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const slidePreviewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const startSlideshow = () => {
    setIsFullscreen(true);
  };

  const endSlideshow = () => {
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextSlide();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === "Escape") {
          endSlideshow();
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          prevSlide();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          nextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fullscreenRef.current &&
        !fullscreenRef.current.contains(event.target as Node)
      ) {
        nextSlide();
      }
    };

    if (isFullscreen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const activeSlidePreview = slidePreviewRefs.current[currentSlide - 1];
    if (activeSlidePreview && scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      const scrollAreaRect = scrollArea.getBoundingClientRect();
      const activeSlideRect = activeSlidePreview.getBoundingClientRect();

      if (activeSlideRect.top < scrollAreaRect.top) {
        scrollArea.scrollTop -= scrollAreaRect.top - activeSlideRect.top;
      } else if (activeSlideRect.bottom > scrollAreaRect.bottom) {
        scrollArea.scrollTop += activeSlideRect.bottom - scrollAreaRect.bottom;
      }
    }
  }, [currentSlide]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/google-slides-logo.webp"
            alt="Google Slides Logo"
            width={24}
            height={24}
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold bg-transparent border-none focus:ring-0"
          />
        </div>
        <div className="flex space-x-4">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Tools</span>
          <span>Help</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Image
            src="/profile-pic.webp"
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <select className="bg-transparent border-none text-sm">
            <option>100%</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Slide
          </Button>
          <Button variant="ghost" size="icon">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Palette className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Shapes className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={startSlideshow}
            className="bg-white text-black border border-gray-300 hover:bg-white hover:text-black"
          >
            Slideshow
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">Slides</span>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={(el) => {
                  slidePreviewRefs.current[index] = el;
                }}
                className={`flex items-start p-4 m-2 cursor-pointer rounded-lg ${
                  currentSlide === slide.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentSlide(slide.id)}
              >
                <div className="text-xs font-medium text-gray-500 mr-3 mt-1">
                  {slide.id}
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-sm relative">
                    <Image
                      src={slide.background}
                      alt="Slide background"
                      width={160}
                      height={90}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center flex-col p-2">
                      {slide.content && (
                        <div className="text-white text-xs mb-2">
                          {slide.content}
                        </div>
                      )}
                      {slide.image && (
                        <img
                          src={slide.image}
                          alt={slide.content}
                          className={
                            slide.content ? "max-h-[50px]" : "max-h-[30px]"
                          }
                        />
                      )}
                      {slide.images && (
                        <div className="flex space-x-4">
                          {slide.images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={slide.content}
                              className="max-h-[50px]"
                            />
                          ))}
                        </div>
                      )}
                      {slide.videos && (
                        <div className="flex space-x-4">
                          {slide.videos?.map((video, index) => (
                            <video
                              key={index}
                              src={video.src}
                              autoPlay
                              loop
                              muted
                              className="max-h-[50px] rounded"
                            />
                          ))}
                        </div>
                      )}
                      {slide.video && (
                        <video
                          src={slide.video.src}
                          autoPlay
                          loop
                          muted
                          className="max-h-[50px] rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center">
          <div className="w-[960px] h-[540px] shadow-lg relative overflow-hidden">
            <Image
              src={slides[currentSlide - 1].background}
              alt="Slide background"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
              {slides[currentSlide - 1].content && (
                <div className="text-white text-4xl mb-6">
                  {slides[currentSlide - 1].content}
                </div>
              )}
              {slides[currentSlide - 1].image && (
                <img
                  src={slides[currentSlide - 1].image}
                  alt={slides[currentSlide - 1].content}
                  className="max-h-[300px]"
                />
              )}
              {slides[currentSlide - 1].images && (
                <div className="flex space-x-4">
                  {slides[currentSlide - 1].images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={slides[currentSlide - 1].content}
                      className="max-h-[300px]"
                    />
                  ))}
                </div>
              )}
              {slides[currentSlide - 1].videos && (
                <div className="flex space-x-4">
                  {slides[currentSlide - 1].videos?.map((video, index) => (
                    <video
                      key={index}
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      className="max-h-[300px] rounded"
                    />
                  ))}
                </div>
              )}
              {slides[currentSlide - 1].video && (
                <video
                  src={slides[currentSlide - 1].video?.src}
                  autoPlay
                  loop
                  muted
                  className="max-h-[300px] rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-t border-gray-300">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <MousePointer2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Hand className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={currentSlide}
            onChange={(e) => setCurrentSlide(Number(e.target.value))}
            className="w-16 text-center"
          />
          <span>/ {slides.length}</span>
          <Button variant="ghost" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
          <select className="bg-transparent border-none text-sm">
            <option>100%</option>
          </select>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fullscreen Slideshow */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-none"
          onClick={nextSlide}
        >
          <div className="relative w-screen h-screen">
            <Image
              src={slides[currentSlide - 1].background}
              alt="Slide background"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0  flex flex-col items-center justify-center p-8">
              {slides[currentSlide - 1].content && (
                <div className="text-white text-6xl mb-10">
                  {slides[currentSlide - 1].content}
                </div>
              )}
              {slides[currentSlide - 1].image && (
                <img
                  src={slides[currentSlide - 1].image}
                  alt={slides[currentSlide - 1].content}
                  className="max-h-[600px]"
                />
              )}
              {slides[currentSlide - 1].images && (
                <div className="flex space-x-4">
                  {slides[currentSlide - 1].images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={slides[currentSlide - 1].content}
                      className="max-h-[600px]"
                    />
                  ))}
                </div>
              )}
              {slides[currentSlide - 1].videos && (
                <div className="flex space-x-4">
                  {slides[currentSlide - 1].videos?.map((video, index) => (
                    <video
                      key={index}
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      className="max-h-[600px] rounded"
                    />
                  ))}
                </div>
              )}
              {slides[currentSlide - 1].video && (
                <video
                  src={slides[currentSlide - 1].video?.src}
                  autoPlay
                  loop
                  muted
                  className="max-h-[600px] rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
