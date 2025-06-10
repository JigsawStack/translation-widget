import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Star, Users, TrendingUp, Home } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">Basic Page</span>
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
        {/* Demo Notice */}
        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">Technology</Badge>
            <Badge variant="outline">AI</Badge>
            <Badge variant="outline">Web Development</Badge>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            The Future of Global Communication: Breaking Down Language Barriers in the Digital Age
          </h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>March 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>2.3K views</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              In today's interconnected world, the ability to communicate across language barriers has become more
              crucial than ever. As businesses expand globally and communities become increasingly diverse, the demand
              for instant, accurate translation solutions continues to grow exponentially.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Evolution of Translation Technology</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              From the early days of rule-based machine translation to today's sophisticated neural networks,
              translation technology has undergone a remarkable transformation. Modern AI-powered translation systems
              can now understand context, cultural nuances, and even maintain the tone and style of the original
              content.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The integration of translation capabilities directly into websites and applications has revolutionized how
              we consume content online. Users no longer need to copy and paste text into separate translation tools –
              instead, they can access multilingual content with a single click.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Impact and Statistics</h2>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-blue-600">75%</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Increase in user engagement when content is available in native language
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-green-600">3.2x</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>Higher conversion rates for multilingual e-commerce websites</CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-purple-600">40+</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Average number of languages supported by modern translation platforms
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              These statistics highlight the tangible benefits of implementing translation solutions. Companies that
              invest in multilingual accessibility often see immediate improvements in user satisfaction, global reach,
              and overall business performance.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technical Implementation Challenges</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              While the benefits are clear, implementing translation functionality comes with its own set of challenges.
              Developers must consider factors such as:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Maintaining website performance while processing translations</li>
              <li>Preserving layout and design integrity across different languages</li>
              <li>Handling right-to-left languages and special characters</li>
              <li>Ensuring SEO compatibility and search engine indexing</li>
              <li>Managing translation quality and accuracy</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Path Forward</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              As we look to the future, translation technology will continue to evolve. We can expect to see
              improvements in real-time voice translation, better handling of technical and specialized content, and
              more seamless integration with existing web technologies.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The goal is not just to translate words, but to create truly inclusive digital experiences that welcome
              users regardless of their native language. This vision of a more connected, accessible internet is what
              drives innovation in the translation technology space.
            </p>
          </div>
        </article>

        {/* Related Content */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Trending</Badge>
              </div>
              <CardTitle>Best Practices for Website Internationalization</CardTitle>
              <CardDescription>
                Learn how to prepare your website for global audiences with proper i18n implementation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>5 min read</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Case Study</Badge>
              </div>
              <CardTitle>How E-commerce Giant Increased Sales by 200%</CardTitle>
              <CardDescription>
                A detailed analysis of implementing multilingual support for a major online retailer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>12 min read</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
