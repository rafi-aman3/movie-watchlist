"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Search, Film, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen relative flex items-center justify-center">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
                style={{
                    backgroundImage: "url('https://image.tmdb.org/t/p/original/4R1ifpFZ1dfwBMiCIDyZ2M2Gvwp.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/80" />
            </div>


            <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">

                <div className="mb-8">
                    <div className="inline-flex items-center justify-center gap-4">
                        <Film className="size-16 sm:size-20 text-primary animate-pulse" />
                        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-2xl">
                            404
                        </h1>
                        <Film className="size-16 sm:size-20 text-primary animate-pulse" />
                    </div>
                </div>


                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto drop-shadow-md">
                    Looks like this page took a wrong turn at the movie theater.
                    The page you're looking for doesn't exist or has been moved.
                </p>


                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        onClick={() => router.push("/")}
                        className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base hover:scale-105 transition-transform shadow-lg"
                    >
                        <Home className="size-5 mr-2" />
                        Back to Home
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => router.push("/search")}
                        className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base hover:scale-105 transition-transform shadow-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
                    >
                        <Search className="size-5 mr-2" />
                        Search Movies
                    </Button>

                    <Button
                        size="lg"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base hover:scale-105 transition-transform text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="size-5 mr-2" />
                        Go Back
                    </Button>
                </div>


                <div className="mt-16 sm:mt-20">
                    <p className="text-sm text-gray-400">
                        Error Code: 404 | Page Not Found
                    </p>
                </div>
            </div>


            <div className="fixed top-10 left-10 opacity-20 hidden lg:block">
                <Film className="size-24 text-white animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div className="fixed bottom-10 right-10 opacity-20 hidden lg:block">
                <Film className="size-32 text-white animate-bounce" style={{ animationDuration: '4s' }} />
            </div>
            <div className="fixed top-1/3 right-20 opacity-10 hidden xl:block">
                <Film className="size-16 text-white animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
        </div>
    );
}