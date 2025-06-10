import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      {/* Spiral Arrow - top right */}
      <Image
        width={128}
        height={128}  
        src="/arrow.png"  
        alt="Spiral Arrow" 
        className="absolute top-4 right-20 w-32 h-32 rotate-0 opacity-80 pointer-events-none select-none z-10"
      />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left max-w-2xl">
          <div className="flex flex-col items-center sm:items-start mb-6">
            <Image width={128} height={128} src="https://jigsawstack.com/jigsaw_logo.svg" alt="Jigsaw Logo" className="w-1/2"/>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900"> Translation Widget Demo</h1>
          <h2 className="text-lg font-medium text-blue-900 mb-4">Powering seamless multilingual experiences for modern websites.</h2>
          <p className="text-base text-gray-700 mb-8">
            Jigsaw's translation widget enables your website to reach a global audience effortlessly. Explore our live demos below to see how Jigsaw can integrate with blogs, e-commerce, and more—delivering instant, high-quality translations and a world-class user experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link 
              href="/blog"
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <h2 className="font-semibold mb-2">Blog Demo</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">See how the widget works in a blog context</p>
            </Link>
            <Link 
              href="/ecommerce"
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <h2 className="font-semibold mb-2">E-commerce Demo</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Experience the widget in an e-commerce setting</p>
            </Link>
            <Link 
              href="/basic"
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <h2 className="font-semibold mb-2">Basic Demo</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Try out the basic widget functionality</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
