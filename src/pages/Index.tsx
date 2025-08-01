
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FeaturedHotels from "@/components/FeaturedHotels";
import ImageCarousel from "@/components/ImageCarousel";
import { ArrowRight, GlobeLock, CheckCheck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

// Hero images
const heroImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];

// Destinations
const destinations = [
  {
    id: 1,
    name: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hotels: 243
  },
  {
    id: 2,
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hotels: 198
  },
  {
    id: 3,
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hotels: 175
  },
  {
    id: 4,
    name: "Sydney",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hotels: 132
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <ImageCarousel images={heroImages} />
          </div>
          
          <div className="relative z-10 pt-32 pb-52 px-4 md:px-8 max-w-5xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
              Discover amazing hotels at the best prices, whether you're looking for luxury or budget options.
            </p>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-booking-orange hover:bg-orange-600"
                asChild
              >
                <Link to="/hotels">
                  Explore Hotels <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                View Deals
              </Button>
            </div>
          </div>
          
          {/* Search Bar (positioned over the hero image) */}
          <SearchBar />
        </section>
        
        {/* Featured Hotels Section */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <FeaturedHotels />
        </section>
        
        {/* Popular Destinations */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <Link 
                  key={destination.id} 
                  to={`/hotels?location=${destination.name}`}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-bold text-xl">{destination.name}</h3>
                        <p>{destination.hotels} hotels</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Why Choose StayEasy</h2>
            <p className="text-gray-500 mb-12 text-center max-w-3xl mx-auto">
              We make finding and booking the perfect hotel simple and hassle-free
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeLock className="h-7 w-7 text-hotel-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Best Prices Guaranteed</h3>
                <p className="text-gray-500">
                  We price match so you always get the best deal on your stay
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCheck className="h-7 w-7 text-hotel-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Easy & Secure Booking</h3>
                <p className="text-gray-500">
                  Book your stay in just a few clicks with our simple, secure system
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-7 w-7 text-hotel-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">24/7 Customer Support</h3>
                <p className="text-gray-500">
                  Our friendly team is here to help you anytime, day or night
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 px-4 md:px-8 bg-hotel-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Get Exclusive Deals & Updates</h2>
            <p className="mb-8">
              Subscribe to our newsletter and be the first to receive special offers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-hotel-300"
              />
              <Button size="lg" className="bg-booking-orange hover:bg-orange-600 whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
