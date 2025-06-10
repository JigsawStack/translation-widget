import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Globe, Calendar, Clock, User, Home, MessageSquare, ThumbsUp, Share2, Bookmark } from "lucide-react"

export default function BlogDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">Blog Page</span>
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

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary">Technology</Badge>
            <Badge variant="secondary">Artificial Intelligence</Badge>
            <Badge variant="secondary">Future Trends</Badge>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            The Evolution of Artificial Intelligence: Past, Present, and Future
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>April 12, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>By Sarah Johnson</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Artificial Intelligence (AI) has transformed from a distant sci-fi concept to an integral part of our
              daily lives. This article explores the remarkable journey of AI technology, its current applications, and
              what the future might hold as we continue to push the boundaries of machine intelligence.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Origins of Artificial Intelligence</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              The concept of artificial intelligence dates back to ancient myths and stories about artificial beings
              endowed with intelligence or consciousness by master craftsmen. However, the field of AI as we know it
              today began to take shape in the mid-20th century.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              In 1950, Alan Turing proposed the Turing Test as a measure of machine intelligence. The test involved a
              human evaluator who would judge natural language conversations between a human and a machine designed to
              generate human-like responses. If the evaluator couldn't reliably tell the machine from the human, the
              machine would be said to have passed the test.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The term "Artificial Intelligence" was first coined in 1956 at the Dartmouth Conference, which is widely
              considered the founding event of AI as a field. The attendees, including John McCarthy, Marvin Minsky,
              Claude Shannon, and others, became the leaders of AI research for decades.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6">
              "Artificial intelligence is the science of making machines do things that would require intelligence if
              done by humans." — Marvin Minsky
            </blockquote>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI in the Present Day</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Today, AI has become ubiquitous in our daily lives. From voice assistants like Siri and Alexa to
              recommendation systems on streaming platforms and e-commerce websites, AI technologies are working behind
              the scenes to enhance our digital experiences.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Machine learning, a subset of AI, has seen remarkable advancements in recent years. Deep learning, in
              particular, has revolutionized fields such as computer vision, natural language processing, and speech
              recognition. These technologies power applications like facial recognition, language translation, and
              autonomous vehicles.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Areas of AI Application Today:</h3>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>
                <strong>Healthcare:</strong> AI is being used for disease diagnosis, drug discovery, and personalized
                treatment plans.
              </li>
              <li>
                <strong>Finance:</strong> Algorithmic trading, fraud detection, and risk assessment are being enhanced
                by AI systems.
              </li>
              <li>
                <strong>Transportation:</strong> Self-driving cars and traffic optimization systems are becoming
                increasingly sophisticated.
              </li>
              <li>
                <strong>Customer Service:</strong> Chatbots and virtual assistants are handling customer inquiries with
                growing efficiency.
              </li>
              <li>
                <strong>Content Creation:</strong> AI tools are now capable of generating text, images, music, and even
                video content.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Future of AI</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              As we look toward the future, AI is poised to continue its rapid evolution. Several key trends are likely
              to shape the development of AI technologies in the coming years:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. General AI</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Current AI systems are considered "narrow" or "weak" AI, designed to perform specific tasks. The holy
              grail of AI research is the development of Artificial General Intelligence (AGI) — systems that can
              understand, learn, and apply knowledge across a wide range of tasks at a level equal to or beyond human
              capabilities.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. AI Ethics and Governance</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              As AI becomes more powerful and pervasive, questions about ethics, bias, privacy, and governance are
              becoming increasingly important. The development of frameworks to ensure AI is developed and deployed
              responsibly will be crucial.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Human-AI Collaboration</h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Rather than replacing humans, many experts believe the most promising future involves AI systems working
              alongside humans, augmenting our capabilities and helping us make better decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              The journey of artificial intelligence from theoretical concept to practical application has been
              remarkable, and we are still in the early chapters of this technological revolution. As AI continues to
              evolve, it will undoubtedly transform industries, societies, and our daily lives in ways we can only begin
              to imagine.
            </p>

            <p className="text-gray-700 leading-relaxed">
              The key challenge for us as a society will be to harness the potential of AI to address our most pressing
              problems while ensuring that these powerful technologies are developed and deployed in ways that are
              ethical, equitable, and beneficial for humanity as a whole.
            </p>
          </div>
        </article>

        {/* Article Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like (243)
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Comment (57)
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>

        {/* Related Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  Technology
                </Badge>
                <h3 className="font-bold text-lg mb-2">Machine Learning: A Beginner's Guide</h3>
                <p className="text-gray-600 text-sm mb-2">
                  An introduction to the fundamentals of machine learning and its applications.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>March 28, 2024</span>
                  <span>8 min read</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  Ethics
                </Badge>
                <h3 className="font-bold text-lg mb-2">The Ethical Implications of AI Development</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Exploring the moral and societal questions raised by advances in artificial intelligence.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>April 5, 2024</span>
                  <span>12 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments (57)</h2>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <p className="text-gray-700">
                Great article! I'm particularly interested in the ethical implications of AI development. As these
                systems become more integrated into critical decision-making processes, how do we ensure they don't
                perpetuate existing biases?
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Sophia Rodriguez</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
              <p className="text-gray-700">
                I work in healthcare, and we're seeing incredible advancements in AI-assisted diagnostics. The ability
                to analyze thousands of medical images and identify patterns that might be missed by human doctors is
                revolutionary. However, I think the point about human-AI collaboration is crucial - these tools should
                augment rather than replace human expertise.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t py-8 mt-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-gray-900">Tech Insights Blog</span>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-gray-600 text-sm">© 2024 Tech Insights Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
