import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Star, 
  ArrowRight,
  Sparkles,
  Gem,
  Crown,
  Diamond,
  CircleDot
} from 'lucide-react'
import './App.css'

// Hero images for the animation sequence
const heroImages = [
  '/hero-jewelry-entering.jpg',
  '/hero-jewelry-sitting.jpg',
  '/hero-jewelry-wearing.jpg',
  '/hero-jewelry-happy.jpg'
]

// Products data - Jewelry
const products = [
  {
    id: 1,
    name: 'Royal Floral Necklace',
    category: 'Necklaces',
    price: 89999,
    originalPrice: 119999,
    image: '/product-necklace.jpg',
    rating: 4.9,
    reviews: 234,
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    price: 24999,
    originalPrice: 29999,
    image: '/product-earrings.jpg',
    rating: 4.8,
    reviews: 189,
    badge: 'New'
  },
  {
    id: 3,
    name: 'Diamond Bangles Set',
    category: 'Bangles',
    price: 129999,
    originalPrice: 149999,
    image: '/product-bangles.jpg',
    rating: 4.9,
    reviews: 156,
    badge: null
  },
  {
    id: 4,
    name: 'Eternal Diamond Ring',
    category: 'Rings',
    price: 54999,
    originalPrice: 69999,
    image: '/product-ring.jpg',
    rating: 5.0,
    reviews: 312,
    badge: 'Popular'
  }
]

// Categories
const categories = [
  { name: 'Necklaces', icon: Gem, count: 85 },
  { name: 'Earrings', icon: Diamond, count: 120 },
  { name: 'Bangles', icon: CircleDot, count: 65 },
  { name: 'Rings', icon: Crown, count: 95 }
]

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    text: 'The Royal Floral Necklace is absolutely stunning! I wore it for my wedding and received so many compliments.',
    rating: 5,
    image: '/hero-jewelry-happy.jpg'
  },
  {
    id: 2,
    name: 'Ananya Patel',
    text: 'Exceptional craftsmanship and the diamonds sparkle beautifully. Best jewelry store I have ever shopped from!',
    rating: 5,
    image: '/hero-jewelry-sitting.jpg'
  },
  {
    id: 3,
    name: 'Meera Reddy',
    text: 'The bangles set exceeded my expectations. The quality is outstanding and the design is timeless.',
    rating: 5,
    image: '/hero-jewelry-wearing.jpg'
  }
]

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Hero image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addToCart = () => {
    setCartCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-pink">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-blur' : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-glow-pink-400 to-glow-pink-600 flex items-center justify-center">
                <Diamond className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-glow-pink-700" style={{ fontFamily: 'Playfair Display, serif' }}>
                GlowJewels
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Collections', 'Categories', 'About', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-glow-pink-800 hover:text-glow-pink-600 font-medium transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <motion.button 
                className="p-2 rounded-full hover:bg-glow-pink-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 text-glow-pink-700" />
              </motion.button>
              <motion.button 
                className="p-2 rounded-full hover:bg-glow-pink-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5 text-glow-pink-700" />
              </motion.button>
              <motion.button 
                className="p-2 rounded-full hover:bg-glow-pink-100 transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5 text-glow-pink-700" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-glow-pink-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
              <motion.button 
                className="md:hidden p-2 rounded-full hover:bg-glow-pink-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="w-5 h-5 text-glow-pink-700" /> : <Menu className="w-5 h-5 text-glow-pink-700" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-glow-pink-100"
            >
              <div className="section-padding py-4 flex flex-col gap-4">
                {['Home', 'Collections', 'Categories', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-glow-pink-800 hover:text-glow-pink-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with Image Slideshow */}
      <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background Images with Crossfade */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentImageIndex]}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-glow-pink-900/70 via-glow-pink-800/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-glow-pink-50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-glow-gold-300/50"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center section-padding">
          <div className="max-w-2xl pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Discover Timeless Elegance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Adorn Yourself
              <span className="block text-glow-gold-300">With Brilliance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-lg"
            >
              Discover our exquisite collection of handcrafted jewelry. 
              Each piece tells a story of elegance, crafted to make you shine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button 
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Collections
              </motion.button>
            </motion.div>

            {/* Image Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-2 mt-12"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-glow-gold-400 w-16' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-glow-pink-600 font-medium mb-4 block">Browse By Category</span>
            <h2 className="text-4xl md:text-5xl font-bold text-glow-pink-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Find Your Perfect Piece
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-glow transition-all duration-500 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-glow-pink-100 to-glow-pink-200 flex items-center justify-center group-hover:from-glow-pink-400 group-hover:to-glow-pink-600 transition-all duration-500">
                    <category.icon className="w-8 h-8 text-glow-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-glow-pink-900 mb-1">{category.name}</h3>
                  <p className="text-glow-pink-500 text-sm">{category.count} Designs</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="collections" className="py-20 section-padding bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-glow-pink-600 font-medium mb-4 block">Our Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-glow-pink-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Exquisite Designs
            </h2>
            <p className="text-glow-pink-600/80 max-w-2xl mx-auto">
              Discover our most loved pieces, handcrafted with precision and adorned with precious stones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-card group"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-glow-pink-500 text-white text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist */}
                <motion.button 
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="w-4 h-4 text-glow-pink-500" />
                </motion.button>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-glow-pink-50">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-glow-pink-500 font-medium mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-glow-pink-900 mb-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-glow-gold-400 fill-glow-gold-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-glow-pink-500 ml-1">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-glow-pink-700">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-glow-pink-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs text-green-500 font-medium">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    onClick={addToCart}
                    className="w-full py-3 bg-glow-pink-500 text-white font-medium rounded-xl hover:bg-glow-pink-600 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button 
              className="btn-secondary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Collections
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <motion.img
                  src="/hero-jewelry-wearing.jpg"
                  alt="Our Story"
                  className="rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-glow-pink-200 rounded-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-glow-gold-200 rounded-full -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-glow-pink-600 font-medium mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-glow-pink-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Crafted with Love, Worn with Pride
              </h2>
              <p className="text-glow-pink-700/80 mb-6 leading-relaxed">
                At GlowJewels, we believe that every piece of jewelry tells a story. Our journey began 
                with a passion for creating timeless pieces that celebrate life's precious moments. 
                Each design is meticulously crafted by master artisans using the finest materials.
              </p>
              <p className="text-glow-pink-700/80 mb-8 leading-relaxed">
                From traditional Indian designs to contemporary styles, our collection offers something 
                for every occasion. We are committed to quality, authenticity, and making you feel 
                truly special.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { number: '50K+', label: 'Happy Customers' },
                  { number: '500+', label: 'Unique Designs' },
                  { number: '25+', label: 'Years of Excellence' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-glow-pink-600">{stat.number}</div>
                    <div className="text-sm text-glow-pink-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 section-padding bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-glow-pink-600 font-medium mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-glow-pink-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-glow transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-glow-gold-400 fill-glow-gold-400" />
                  ))}
                </div>

                <p className="text-glow-pink-700/80 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-glow-pink-900">{testimonial.name}</h4>
                    <p className="text-sm text-glow-pink-500">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-glow-pink-500 to-glow-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Diamond className="w-8 h-8" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Join Our Exclusive Club
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Subscribe to receive exclusive offers, early access to new collections, and special discounts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-glow-pink-900 placeholder:text-glow-pink-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  className="px-8 py-4 bg-white text-glow-pink-600 font-medium rounded-full hover:bg-glow-pink-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-glow-pink-900 text-white py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-glow-pink-400 to-glow-pink-500 flex items-center justify-center">
                  <Diamond className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  GlowJewels
                </span>
              </div>
              <p className="text-glow-pink-200/80 mb-6">
                Discover timeless elegance with our exquisite collection of handcrafted jewelry.
              </p>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-glow-pink-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xs capitalize">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Collections', 'About Us', 'Contact', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-glow-pink-200/80 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Categories</h4>
              <ul className="space-y-3">
                {['Necklaces', 'Earrings', 'Bangles', 'Rings', 'Bridal Sets'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-glow-pink-200/80 hover:text-white transition-colors">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-3 text-glow-pink-200/80">
                <li>support@glowjewels.com</li>
                <li>+91 70737 51923</li>
                <li>Mon - Sat: 10AM - 8PM</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-glow-pink-200/60 text-sm">
              © 2024 GlowJewels. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-glow-pink-200/60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
