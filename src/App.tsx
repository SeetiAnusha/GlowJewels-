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
    name: 'GIVA 925 Silver Rose Gold Necklace',
    category: 'Necklaces',
    price: 3484,
    originalPrice: 3484,
    image: 'https://m.media-amazon.com/images/I/51SvnNKVyVL._SY575_.jpg',
    rating: 4.5,
    reviews: 0,
    badge: 'New',
    affiliateLink: 'https://amzn.to/4r1pqwC'
  },
  {
    id: 2,
    name: 'GIVA Heart Butterfly Pearl Necklace',
    category: 'Necklaces',
    price: 2849,
    originalPrice: 3499,
    image: 'https://m.media-amazon.com/images/I/51OJKwyv90L._SY625_.jpg',
    rating: 4.5,
    reviews: 128,
    badge: 'Trending',
    affiliateLink: 'https://amzn.to/400S5qF'
  },
  {
    id: 3,
    name: 'SALTY Anti Tarnish Vibrant Blue Butterfly Pendant Necklace',
    category: 'Necklaces',
    price: 649,
    originalPrice: 999,
    image: 'https://m.media-amazon.com/images/I/61nswNNZpPL._SY625_.jpg',
    rating: 4.3,
    reviews: 95,
    badge: 'Best Seller',
    affiliateLink: 'https://amzn.to/4tV2TVb'
  },
  {
    id: 4,
    name: 'MEENAZ Heart Locket Gold Stainless Steel Pendant Necklace',
    category: 'Necklaces',
    price: 299,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/41vMdpGSy7L._SY695_.jpg',
    rating: 4.4,
    reviews: 210,
    badge: 'Popular',
    affiliateLink: 'https://amzn.to/4ba95kB'
  },
  {
    id: 5,
    name: "Nilu's Collection Stylish CZ Chain Pendant Set",
    category: 'Necklaces',
    price: 297,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/51NSY-FMDgL._SX695_.jpg',
    rating: 4.6,
    reviews: 156,
    badge: 'New',
    affiliateLink: 'https://amzn.to/4s9AngE'
  },
  {
    id: 6,
    name: "Nilu's Collection 18K Rose Gold Plated Heart Pendant",
    category: 'Necklaces',
    price: 299,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/41ayA5cSlDL._SX695_.jpg',
    rating: 4.5,
    reviews: 89,
    badge: 'Valentine Special',
    affiliateLink: 'https://amzn.to/3N9rgxD'
  },
  {
    id: 7,
    name: 'Fashion Frill Four Leaf Pendant Jewellery',
    category: 'Necklaces',
    price: 299,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/416puKorgUL._SY625_.jpg',
    rating: 4.2,
    reviews: 67,
    badge: 'Hot Deal',
    affiliateLink: 'https://amzn.to/4benc8r'
  },
  {
    id: 8,
    name: 'SALTY Anti Tarnish Dancing Swan Pendant Necklace',
    category: 'Necklaces',
    price: 349,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/61fvMVuXWqL._SY625_.jpg',
    rating: 4.6,
    reviews: 142,
    badge: 'Trending',
    affiliateLink: 'https://amzn.to/4rLFXpK'
  },
  {
    id: 9,
    name: 'GIVA 925 Silver Rose Gold Infinity Pendant Set',
    category: 'Jewelry Sets',
    price: 1998,
    originalPrice: 2999,
    image: 'https://m.media-amazon.com/images/I/51rxoDaZ3vL._SY625_.jpg',
    rating: 4.7,
    reviews: 203,
    badge: 'Premium',
    affiliateLink: 'https://amzn.to/3OE0rCa'
  },
  {
    id: 10,
    name: 'SALTY Anti Tarnish Dreamy Heart Pendant Necklace',
    category: 'Necklaces',
    price: 499,
    originalPrice: 799,
    image: 'https://m.media-amazon.com/images/I/51yVUiRFHkL._SY695_.jpg',
    rating: 4.4,
    reviews: 118,
    badge: 'Valentine Special',
    affiliateLink: 'https://amzn.to/4rHgwpq'
  },
  {
    id: 11,
    name: 'Yellow Chimes Silver Butterfly Pendant with Purple Crystal',
    category: 'Necklaces',
    price: 288,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/51FlHbCjLhL._SY695_.jpg',
    rating: 4.3,
    reviews: 87,
    badge: 'Best Value',
    affiliateLink: 'https://amzn.to/4skSroh'
  },
  {
    id: 12,
    name: 'SALTY Anti Tarnish Fancy Loving Gift Box Set',
    category: 'Jewelry Sets',
    price: 1599,
    originalPrice: 2499,
    image: 'https://m.media-amazon.com/images/I/71W20022KbL._SY625_.jpg',
    rating: 4.8,
    reviews: 176,
    badge: 'Gift Set',
    affiliateLink: 'https://amzn.to/40EO0sl'
  },
  {
    id: 13,
    name: 'Shining Diva AAA Crystal Butterfly Chain Pendant',
    category: 'Necklaces',
    price: 289,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/51HKS6d7QaL._SY695_.jpg',
    rating: 4.4,
    reviews: 134,
    badge: 'Best Seller',
    affiliateLink: 'https://amzn.to/4tX9e26'
  },
  {
    id: 14,
    name: 'MEENAZ Moti Shell Pearl Rose Gold Long Chain',
    category: 'Necklaces',
    price: 197,
    originalPrice: 499,
    image: 'https://m.media-amazon.com/images/I/51YU60HM7DL._SY625_.jpg',
    rating: 4.5,
    reviews: 98,
    badge: 'Budget Pick',
    affiliateLink: 'https://amzn.to/402UWzr'
  },
  {
    id: 15,
    name: 'Yellow Chimes Multilayer Pearl Choker Set',
    category: 'Jewelry Sets',
    price: 288,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/61RrH1p-0BL._SY695_.jpg',
    rating: 4.6,
    reviews: 167,
    badge: 'Trending',
    affiliateLink: 'https://amzn.to/4l9c14n'
  },
  {
    id: 16,
    name: 'I Jewels Traditional Stone Pearl Choker Set',
    category: 'Jewelry Sets',
    price: 399,
    originalPrice: 799,
    image: 'https://m.media-amazon.com/images/I/81sKlabB8dL._SY625_.jpg',
    rating: 4.7,
    reviews: 189,
    badge: 'Traditional',
    affiliateLink: 'https://amzn.to/46zoVCO'
  },
  {
    id: 17,
    name: 'Shining Diva Fancy Pearl Choker Traditional Set',
    category: 'Jewelry Sets',
    price: 598,
    originalPrice: 999,
    image: 'https://m.media-amazon.com/images/I/71L18OHjSsL._SY695_.jpg',
    rating: 4.8,
    reviews: 221,
    badge: 'Premium',
    affiliateLink: 'https://amzn.to/4aTZaOD'
  },
  {
    id: 18,
    name: 'Shining Diva 18k Gold & Silver Pearl Jewellery Set',
    category: 'Jewelry Sets',
    price: 283,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/616eAeTsWWL._SY695_.jpg',
    rating: 4.5,
    reviews: 156,
    badge: 'Designer',
    affiliateLink: 'https://amzn.to/3MSGRS0'
  },
  {
    id: 19,
    name: 'Sasitrends Traditional Gold Plated Pearl Necklace Set',
    category: 'Jewelry Sets',
    price: 830,
    originalPrice: 1499,
    image: 'https://m.media-amazon.com/images/I/81wGxwa3rnL._SY675_.jpg',
    rating: 4.6,
    reviews: 145,
    badge: 'Traditional',
    affiliateLink: 'https://amzn.to/4sfPbdN'
  },
  {
    id: 20,
    name: 'Shining Diva Pearl Bracelet Earrings Necklace Set',
    category: 'Jewelry Sets',
    price: 494,
    originalPrice: 999,
    image: 'https://m.media-amazon.com/images/I/715x4rLGktL._SY695_.jpg',
    rating: 4.7,
    reviews: 198,
    badge: 'Valentine Gift',
    affiliateLink: 'https://amzn.to/3OFXOQf'
  },
  {
    id: 21,
    name: 'Shining Diva Latest Choker Design Necklace Set',
    category: 'Jewelry Sets',
    price: 299,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/71t65utyG6L._SY695_.jpg',
    rating: 4.5,
    reviews: 167,
    badge: 'Best Seller',
    affiliateLink: 'https://amzn.to/4aEUspj'
  },
  {
    id: 22,
    name: 'Yellow Chimes Temple Bridal Choker Necklace Set',
    category: 'Jewelry Sets',
    price: 698,
    originalPrice: 1299,
    image: 'https://m.media-amazon.com/images/I/71r7vM0GusL._SY695_.jpg',
    rating: 4.8,
    reviews: 234,
    badge: 'Bridal',
    affiliateLink: 'https://amzn.to/4ceqWb6'
  },
  {
    id: 23,
    name: 'Shining Diva Traditional Fancy Necklace Set',
    category: 'Jewelry Sets',
    price: 398,
    originalPrice: 799,
    image: 'https://m.media-amazon.com/images/I/71pFMNcYCxL._SY695_.jpg',
    rating: 4.6,
    reviews: 189,
    badge: 'Trending',
    affiliateLink: 'https://amzn.to/47haN19'
  },
  {
    id: 24,
    name: 'Shining Diva 18k Gold Plated Choker Necklace Set',
    category: 'Jewelry Sets',
    price: 348,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/71zDzsfZWeL._SY695_.jpg',
    rating: 4.5,
    reviews: 156,
    badge: 'Popular',
    affiliateLink: 'https://amzn.to/4qZ9FWU'
  },
  {
    id: 25,
    name: 'Shining Diva Pearl Wedding Party Choker Set',
    category: 'Jewelry Sets',
    price: 389,
    originalPrice: 799,
    image: 'https://m.media-amazon.com/images/I/716OR461pAL._SY695_.jpg',
    rating: 4.7,
    reviews: 201,
    badge: 'Wedding',
    affiliateLink: 'https://amzn.to/4r70Iep'
  },
  {
    id: 26,
    name: 'Sasitrends Traditional Pearl Chain Pendant Set',
    category: 'Jewelry Sets',
    price: 915,
    originalPrice: 1699,
    image: 'https://m.media-amazon.com/images/I/813S1Ob6abL._SY695_.jpg',
    rating: 4.8,
    reviews: 178,
    badge: 'Premium',
    affiliateLink: 'https://amzn.to/4rLL8pG'
  },
  {
    id: 27,
    name: 'ZENEME American Diamond Leaf Shaped Necklace Set',
    category: 'Jewelry Sets',
    price: 609,
    originalPrice: 1299,
    image: 'https://m.media-amazon.com/images/I/719+X33tXkL._SY695_.jpg',
    rating: 4.6,
    reviews: 143,
    badge: 'Complete Set',
    affiliateLink: 'https://amzn.to/4tVc6Nf'
  },
  {
    id: 28,
    name: 'MEENAZ Heart Lock Triple Layer Chain Choker',
    category: 'Necklaces',
    price: 333,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/61bpIKxltqL._SY625_.jpg',
    rating: 4.5,
    reviews: 167,
    badge: 'Valentine Gift',
    affiliateLink: 'https://amzn.to/3OMA4tJ'
  },
  {
    id: 29,
    name: 'MEENAZ Oxidised Silver Chandbali Pearl Jhumka',
    category: 'Earrings',
    price: 168,
    originalPrice: 399,
    image: 'https://m.media-amazon.com/images/I/910LFbNPhhL._SY625_.jpg',
    rating: 4.7,
    reviews: 289,
    badge: 'Best Seller',
    affiliateLink: 'https://amzn.to/4aGdGuF'
  },
  {
    id: 30,
    name: 'MEENAZ Butterfly Peacock Temple Jhumki Earrings',
    category: 'Earrings',
    price: 299,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/91ApOe7A3RL._SY695_.jpg',
    rating: 4.6,
    reviews: 234,
    badge: 'Traditional',
    affiliateLink: 'https://amzn.to/3MKdQbj'
  },
  {
    id: 31,
    name: 'Zaveri Pearls Pink Kundan Austrian Diamond Earrings',
    category: 'Earrings',
    price: 278,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/61PihX8SyoL._SY695_.jpg',
    rating: 4.5,
    reviews: 198,
    badge: 'Ethnic',
    affiliateLink: 'https://amzn.to/4tZRKST'
  },
  {
    id: 32,
    name: 'YouBella Gold Plated Pearl Jhumka Earrings',
    category: 'Earrings',
    price: 289,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/6148o0F+OaL._SY695_.jpg',
    rating: 4.4,
    reviews: 176,
    badge: 'Traditional',
    affiliateLink: 'https://amzn.to/3OCU02g'
  },
  {
    id: 33,
    name: 'Zaveri Pearls Antique Gold Tone Traditional Jhumki',
    category: 'Earrings',
    price: 282,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/61TC+8FXvaL._SY695_.jpg',
    rating: 4.7,
    reviews: 212,
    badge: 'Antique',
    affiliateLink: 'https://amzn.to/46xOEvk'
  },
  {
    id: 34,
    name: 'Rubans Oxidised Jhumka Earrings Stylish Traditional',
    category: 'Earrings',
    price: 262,
    originalPrice: 599,
    image: 'https://m.media-amazon.com/images/I/61U6ezaLUlL._SY695_.jpg',
    rating: 4.5,
    reviews: 189,
    badge: 'Trendy',
    affiliateLink: 'https://amzn.to/4bd3gml'
  },
  {
    id: 35,
    name: 'Estele Fancy Designer Sparkling Nakshatra Earrings',
    category: 'Earrings',
    price: 314,
    originalPrice: 699,
    image: 'https://m.media-amazon.com/images/I/61yD6uKXatL._SY695_.jpg',
    rating: 4.6,
    reviews: 156,
    badge: 'Designer',
    affiliateLink: 'https://amzn.to/4aF2gY9'
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
  const [cartCount] = useState(0)
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

                {/* Image - Clickable to Affiliate Link */}
                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden bg-glow-pink-50 block cursor-pointer"
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </a>

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

                  {/* View Product - Affiliate Link */}
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-full py-3 bg-glow-pink-500 text-white font-medium rounded-xl hover:bg-glow-pink-600 transition-all hover:scale-[1.02] active:scale-[0.98] text-center no-underline cursor-pointer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View Product
                  </a>
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
