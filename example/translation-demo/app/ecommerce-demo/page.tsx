import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Home,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  Search,
  User,
  Menu,
} from "lucide-react"

export default function EcommerceDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">E-commerce Page</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Demo Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="#" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                Electronics
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                Headphones
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">SoundWave Pro Wireless Headphones</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-lg border p-4 flex items-center justify-center">
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-32 h-32 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">New Arrival</Badge>
              <Badge variant="secondary">Bestseller</Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">SoundWave Pro Wireless Headphones</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-gray-600">4.2 (128 reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">$149.99</span>
                <span className="text-lg text-gray-500 line-through">$199.99</span>
                <Badge className="bg-red-500">25% OFF</Badge>
              </div>
              <p className="text-green-600 font-medium">In Stock - Ships within 24 hours</p>
            </div>

            <p className="text-gray-700 mb-6">
              Experience premium sound quality with the SoundWave Pro Wireless Headphones. Featuring active noise
              cancellation, 40-hour battery life, and comfortable over-ear design for all-day listening comfort.
            </p>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-gray-300 cursor-pointer"></div>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                Introducing the SoundWave Pro Wireless Headphones – the ultimate audio companion for music enthusiasts,
                professionals, and casual listeners alike. Engineered with cutting-edge technology and designed for
                maximum comfort, these headphones deliver an exceptional listening experience that will transform how
                you enjoy your favorite music, podcasts, and calls.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Immersive Sound Quality</h3>
              <p className="mb-4">
                Experience music the way artists intended with our custom-tuned 40mm dynamic drivers that produce rich,
                detailed sound across all frequencies. The advanced acoustic architecture ensures deep, powerful bass,
                clear mids, and crisp highs for a truly balanced audio profile.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Active Noise Cancellation</h3>
              <p className="mb-4">
                Block out the world around you with our advanced Active Noise Cancellation (ANC) technology. Using
                external and internal microphones, these headphones continuously monitor and counteract environmental
                noise, allowing you to focus on your audio without distractions. When you need to stay aware of your
                surroundings, simply activate Transparency Mode with a tap.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">All-Day Comfort</h3>
              <p className="mb-4">
                Designed for extended listening sessions, the SoundWave Pro features memory foam ear cushions wrapped in
                premium protein leather that conforms to your ears for a comfortable fit. The adjustable headband
                distributes weight evenly to prevent pressure points, making these headphones comfortable to wear all
                day long.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Exceptional Battery Life</h3>
              <p>
                With up to 40 hours of playback time with ANC enabled (and up to 60 hours with ANC off), these
                headphones will keep the music going throughout your day and beyond. When you do need to recharge, our
                quick-charge technology provides 5 hours of playback from just 10 minutes of charging.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Audio Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Driver Size</td>
                      <td className="py-2 text-gray-700">40mm Dynamic Drivers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Frequency Response</td>
                      <td className="py-2 text-gray-700">20Hz - 20kHz</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Impedance</td>
                      <td className="py-2 text-gray-700">32 Ohms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Sensitivity</td>
                      <td className="py-2 text-gray-700">105dB SPL/mW</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Noise Cancellation</td>
                      <td className="py-2 text-gray-700">Active Noise Cancellation (ANC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">General Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Battery Life</td>
                      <td className="py-2 text-gray-700">Up to 40 hours (ANC on), 60 hours (ANC off)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Charging Time</td>
                      <td className="py-2 text-gray-700">2 hours full charge, 10 min for 5 hours playback</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Bluetooth Version</td>
                      <td className="py-2 text-gray-700">Bluetooth 5.2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Codecs</td>
                      <td className="py-2 text-gray-700">SBC, AAC, aptX HD, LDAC</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-900">Weight</td>
                      <td className="py-2 text-gray-700">250g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mt-6 mb-3">What's in the Box</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>SoundWave Pro Wireless Headphones</li>
              <li>USB-C Charging Cable</li>
              <li>3.5mm Audio Cable</li>
              <li>Carrying Case</li>
              <li>User Manual</li>
              <li>Quick Start Guide</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <Button>Write a Review</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">4.2</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on 128 reviews</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">5 stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">65%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">4 stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">20%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">3 stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">10%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">2 stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "3%" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">3%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-16">1 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "2%" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">2%</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">James Wilson</div>
                      <Badge variant="outline">Verified Purchase</Badge>
                    </div>
                    <div className="text-sm text-gray-500">March 15, 2024</div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <h3 className="font-bold mb-2">Exceptional sound quality and comfort</h3>
                  <p className="text-gray-700">
                    I've tried many wireless headphones over the years, and these are by far the best. The sound quality
                    is exceptional - clear highs, detailed mids, and deep bass without being overwhelming. The noise
                    cancellation is impressive, especially on flights. I can wear them all day without discomfort, and
                    the battery life is as advertised. Highly recommended!
                  </p>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">Sarah Johnson</div>
                      <Badge variant="outline">Verified Purchase</Badge>
                    </div>
                    <div className="text-sm text-gray-500">March 3, 2024</div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <h3 className="font-bold mb-2">Great headphones with minor connectivity issues</h3>
                  <p className="text-gray-700">
                    The sound quality and comfort of these headphones are excellent. The noise cancellation works very
                    well in most environments. My only complaint is that I occasionally experience connectivity issues
                    with my laptop - sometimes they disconnect for no apparent reason. It doesn't happen often enough to
                    be a major issue, but it's worth mentioning. Overall, I'm very happy with my purchase.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping & Returns</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Shipping Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Free Standard Shipping</strong> on all orders over $50 (3-5 business days)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Express Shipping</strong> available for $12.99 (1-2 business days)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>International Shipping</strong> available to over 60 countries
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">All orders ship from our warehouse within 24 hours</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Return Policy</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>30-Day Money Back Guarantee</strong> on all products
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Items must be returned in original packaging with all accessories
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Free return shipping</strong> on defective items
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Refunds are processed within 5-7 business days after we receive your return
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Warranty</h3>
                <p className="text-gray-700 mb-2">
                  All SoundWave Pro Wireless Headphones come with a 2-year limited warranty that covers manufacturing
                  defects and hardware failures under normal use.
                </p>
                <p className="text-gray-700">
                  For warranty claims or questions, please contact our customer support team at support@soundwave.com or
                  call 1-800-SOUND-PRO.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                    ></path>
                  </svg>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {
                      [
                        "SoundWave Mini Earbuds",
                        "Premium Headphone Stand",
                        "Bluetooth Speaker",
                        "Replacement Ear Pads",
                      ][item - 1]
                    }
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < [4, 5, 3, 4][item - 1] ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({[24, 18, 36, 12][item - 1]})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">${[79.99, 29.99, 59.99, 19.99][item - 1]}</span>
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and new product updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center pt-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-green-500" />
              <span className="font-bold text-xl">ShopGlobal</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 ShopGlobal. All rights reserved. Terms & Privacy</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
