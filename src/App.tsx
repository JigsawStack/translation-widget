"use client"

import { Routes, Route, Link } from "react-router-dom"
import Widget from "./components/translation"
import "./App.css"

// Home page component
const Home = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Our Website</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main>
        <section className="article-grid">
          <article className="article">
            <h2>Latest News</h2>
            <p>
              We're excited to announce the launch of our new product
              line. Our team has been working tirelessly to bring you
              the best possible experience.
            </p>
            <button>Read More</button>
          </article>

          <article className="article">
            <h2>Company Updates</h2>
            <p>
              Our company has expanded to three new locations this
              year. We're now serving customers in over 50 countries
              worldwide.
            </p>
            <button>Learn More</button>
          </article>

          <article className="article">
            <h2>Customer Stories</h2>
            <p>
              Hear from our satisfied customers about how our products
              have transformed their businesses and improved
              efficiency.
            </p>
            <button>View Stories</button>
          </article>
        </section>

        <section className="product">
          <h2>Featured Product</h2>
          <p>
            Experience the next generation of innovation with our latest
            product. Designed with you in mind, it offers unparalleled
            performance and reliability.
          </p>

          <div className="product-features">
            <div>
              <h3>Key Features</h3>
              <ul>
                <li>Advanced Technology</li>
                <li>User-friendly Interface</li>
                <li>24/7 Support</li>
                <li>Cloud Integration</li>
              </ul>
            </div>
            <div>
              <h3>Benefits</h3>
              <ul>
                <li>Increased Productivity</li>
                <li>Cost Effective</li>
                <li>Scalable Solution</li>
                <li>Secure Platform</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            Have questions? Our team is here to help. Reach out to us
            through any of the following channels:
          </p>
          <ul>
            <li>Email: support@example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Business Street, Tech City, TC 12345</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </footer>

      <Widget pageLanguage="en" publicKey={''} autoDetectLanguage={false} />
    </div>
  )
}

// About page component
const About = () => (
  <div>
    <h1>About Page</h1>
    <p>This is the about page of our application.</p>
  </div>
)

// Products page component
const Products = () => (
  <div>
    <h1>Products Page</h1>
    <p>Explore our range of products and services.</p>
  </div>
)

// Contact page component
const Contact = () => (
  <div>
    <h1>Contact Page</h1>
    <p>Get in touch with our team.</p>
  </div>
)

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}