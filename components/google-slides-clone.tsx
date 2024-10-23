"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Hand,
  Type,
  Shapes,
  Palette,
  Undo,
  Redo,
  Search,
  Printer,
  MousePointer2,
  MessageSquare,
  Clock,
  Video,
  Highlighter,
  Star,
  Share,
  Cloud,
  Image as ImageIcon,
} from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Slide {
  id: number;
  onlyImage?: string;
  custom?: {
    content?: string;
    image?: string;
    videos?: {
      src: string;
      link: string;
    }[];
  };
}

export default function GoogleSlidesClone({
  slides,
  initialTitle,
}: {
  slides: Slide[];
  initialTitle: string;
}) {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const slidePreviewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showHeader, setShowHeader] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const startSlideshow = () => {
    document.body.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
    setIsFullscreen(true);
  };

  const endSlideshow = () => {
    document
      .exitFullscreen()
      .then(() => setIsFullscreen(false))
      .catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const nextKeys = ["ArrowRight", "ArrowDown", "PageUp", " ", "Enter"];
      const prevKeys = ["ArrowLeft", "ArrowUp", "PageDown"];
      const endKeys = ["Escape"];
      const nonFullscreenNextKeys = ["ArrowDown", "PageDown"];
      const nonFullscreenPrevKeys = ["ArrowUp", "PageUp"];

      if (isFullscreen) {
        if (nextKeys.includes(e.key)) {
          e.preventDefault();
          nextSlide();
        } else if (prevKeys.includes(e.key)) {
          e.preventDefault();
          prevSlide();
        } else if (endKeys.includes(e.key) && isFullscreen) {
          e.preventDefault();
          endSlideshow();
        }
      } else {
        if (nonFullscreenNextKeys.includes(e.key)) {
          e.preventDefault();
          nextSlide();
        } else if (nonFullscreenPrevKeys.includes(e.key)) {
          e.preventDefault();
          prevSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, currentSlide, nextSlide, prevSlide]);

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
  }, [isFullscreen, currentSlide, nextSlide]);

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
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div className="flex items-center space-x-5">
            <Link href="/">
              <Image
                src="/general/google-slides-logo.png"
                width={28}
                height={40}
                alt="Google Slides logo"
              />
            </Link>
            <div>
              <div className="flex items-center space-x-4">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-semibold bg-transparent border-none focus:ring-0 text-2xl p-0 w-fit mr-2 shadow-none"
                />
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Star className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Share className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Cloud className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-4 font-normal mt-1">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Insert</span>
                <span>Format</span>
                <span>Slide</span>
                <span>Arrange</span>
                <span>Tools</span>
                <span>Extensions</span>
                <span>Help</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Clock className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Video className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              className="bg-white text-md rounded-full"
              size="lg"
              onClick={startSlideshow}
            >
              Slideshow
            </Button>
            <Button
              className="bg-sky-200 text-black hover:bg-sky-300 text-md rounded-full"
              size="lg"
            >
              Share
            </Button>
            <Image
              src="/general/profile-pic.webp"
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Plus className="h-5 w-5" />
          </Button>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Undo className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Redo className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Printer className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Palette className="h-5 w-5" />
          </Button>
          <select className="bg-transparent border-none text-sm w-20 flex cursor-pointer">
            <option>Fit</option>
            <option>100%</option>
            <option>75%</option>
            <option>50%</option>
            <option>25%</option>
          </select>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MousePointer2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Type className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Shapes className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Minus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Highlighter className="h-5 w-5" />
          </Button>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="sm" className="text-md">
            Background
          </Button>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="sm" className="text-md">
            Layout
          </Button>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="sm" className="text-md">
            Theme
          </Button>
          <div className="w-1 h-6 border-l border-slate-300" />
          <Button variant="ghost" size="sm" className="text-md">
            Transition
          </Button>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="lg" className="text-gray-600">
            <Video className="h-5 w-5 mr-3" />
            <div className="font-medium text-md">Rec</div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHeader((h) => !h)}
            className="ml-6"
          >
            {showHeader ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="ml-6 h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="min-w-64 w-64 bg-gray-100 border-r border-gray-300 flex flex-col">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={(el) => {
                  slidePreviewRefs.current[index] = el;
                }}
                className={`flex items-start p-4 m-4 cursor-pointer rounded-lg ${
                  currentSlide === slide.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentSlide(slide.id)}
              >
                <div className="text-xs font-medium text-gray-500 mr-3 mt-1">
                  {slide.id}
                </div>
                <div className="flex-1 w-full h-[100px]">
                  <div className="rounded-lg overflow-hidden shadow-sm relative h-full w-full">
                    <div className="w-full h-full relative flex bg-black">
                      {slide.onlyImage && (
                        <Image
                          src={slide.onlyImage || ""}
                          alt="Slide image"
                          layout="fill"
                          objectFit="contain"
                          className="max-w-[80%] max-h-[75%] my-auto mx-auto"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col p-2">
                      {slide.custom && (
                        <>
                          {slide.custom.content && (
                            <div className="text-white text-xs mb-1 font-medium text-center">
                              {slide.custom.content}
                            </div>
                          )}
                          {slide.custom.image && (
                            <div className="relative w-[50px] h-[50px] rounded-lg overflow-hidden shadow-lg">
                              <Image
                                src={slide.custom.image}
                                alt={slide.custom.content || ""}
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          )}
                          {slide.custom.videos && (
                            <div className="flex space-x-4">
                              {slide.custom.videos?.map((video, index) => (
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
                        </>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-4 left-4 flex justify-between items-center">
                      <Image
                        src="/general/next-conf-logo.png"
                        alt="Next.js CONF 24"
                        width={25}
                        height={4}
                      />
                      <Image
                        src="/general/nextjs-logo.png"
                        alt="Vercel"
                        width={4}
                        height={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center">
          <div className="w-[95%] aspect-video shadow-lg relative overflow-hidden">
            <div className="w-full h-full flex bg-black">
              {slides[currentSlide - 1].onlyImage && (
                <Image
                  src={slides[currentSlide - 1].onlyImage || ""}
                  alt="Slide image"
                  layout="fill"
                  objectFit="contain"
                  className="max-w-[80%] my-auto mx-auto"
                />
              )}
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
              {slides[currentSlide - 1].custom && (
                <>
                  {slides[currentSlide - 1].custom?.content && (
                    <div className="text-white text-lg md:text-4xl mb-6 xl:mb-12 font-medium xl:text-5xl text-center">
                      {slides[currentSlide - 1].custom?.content}
                    </div>
                  )}
                  {slides[currentSlide - 1].custom?.image && (
                    <div className="relative h-[300px] w-[300px] xl:h-[400px] xl:w-[400px] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={slides[currentSlide - 1].custom?.image || ""}
                        alt={slides[currentSlide - 1].custom?.content || ""}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                  {slides[currentSlide - 1].custom?.videos && (
                    <div className="flex space-x-4">
                      {slides[currentSlide - 1].custom?.videos?.map(
                        (video, index) => (
                          <video
                            key={index}
                            src={video.src}
                            autoPlay
                            loop
                            muted
                            className="max-h-[500px] rounded"
                          />
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="absolute bottom-6 right-12 left-12 flex justify-between items-center">
              <Image
                src="/general/next-conf-logo.png"
                alt="Next.js CONF 24"
                width={100}
                height={16}
              />
              <Image
                src="/general/nextjs-logo.png"
                alt="Vercel"
                width={21}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-t border-gray-300">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MousePointer2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
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
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Minus className="h-4 w-4" />
          </Button>
          <select className="bg-transparent border-none text-sm">
            <option>100%</option>
          </select>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fullscreen Slideshow */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          className={`${inter.className} fixed inset-0 bg-black z-50 flex items-center justify-center cursor-none`}
          onClick={nextSlide}
        >
          <div className="relative w-screen h-screen overflow-hidden">
            <div className="w-full h-full flex bg-black">
              {slides[currentSlide - 1].onlyImage && (
                <Image
                  src={slides[currentSlide - 1].onlyImage || ""}
                  alt="Slide image"
                  layout="fill"
                  objectFit="contain"
                  className="max-w-[80%] my-auto mx-auto"
                  quality={100}
                />
              )}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {slides[currentSlide - 1].custom && (
                <>
                  {slides[currentSlide - 1].custom?.content && (
                    <div className="text-white text-7xl mb-20 font-medium">
                      {slides[currentSlide - 1].custom?.content}
                    </div>
                  )}
                  {slides[currentSlide - 1].custom?.image && (
                    <div className="relative w-[600px] h-[600px] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={slides[currentSlide - 1].custom?.image || ""}
                        alt={slides[currentSlide - 1].custom?.content || ""}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                  {slides[currentSlide - 1].custom?.videos && (
                    <div className="flex space-x-4">
                      {slides[currentSlide - 1].custom?.videos?.map(
                        (video, index) => (
                          <video
                            key={index}
                            src={video.src}
                            autoPlay
                            loop
                            muted
                            className="max-h-[600px] rounded"
                          />
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="absolute bottom-8 right-24 left-24 flex justify-between items-center">
              <Image
                src="/general/next-conf-logo.png"
                alt="Next.js CONF 24"
                width={175}
                height={28}
              />
              <Image
                src="/general/nextjs-logo.png"
                alt="Vercel"
                width={46}
                height={55}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
