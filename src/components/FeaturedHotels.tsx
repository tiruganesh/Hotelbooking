
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HotelCard, { HotelCardProps } from "./HotelCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_HOTELS: HotelCardProps[] = [
  {
    id: 1,
    name: "Grand Hyatt Hotel",
    location: "New York, NY",
    price: 299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Breakfast", "Pool", "Gym", "Spa"],
    discount: 15
  },
  {
    id: 2,
    name: "Seaside Resort & Spa",
    location: "Miami Beach, FL",
    price: 359,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Beach Access", "Spa", "King Bed", "Ocean View"]
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Aspen, CO",
    price: 259,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Fireplace", "King Bed", "Mountain View", "Ski Access"],
    discount: 10
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "San Francisco, CA",
    price: 229,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "City View", "Queen Bed", "Breakfast", "Gym"]
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    location: "Phoenix, AZ",
    price: 199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Pool", "Desert View", "Spa", "King Bed"]
  },
  {
    id: 6,
    name: "Historic Downtown Inn",
    location: "Charleston, SC",
    price: 189,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Historic Tour", "Queen Bed", "Breakfast", "Garden"]
  }
];

const FeaturedHotels = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleHotels, setVisibleHotels] = useState<HotelCardProps[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Set number of items to display based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update visible hotels when currentSlide or itemsPerPage changes
  useEffect(() => {
    const startIndex = currentSlide * itemsPerPage;
    setVisibleHotels(MOCK_HOTELS.slice(startIndex, startIndex + itemsPerPage));
  }, [currentSlide, itemsPerPage]);

  const totalSlides = Math.ceil(MOCK_HOTELS.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Hotels</h2>
        <div className="flex space-x-2">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleHotels.map((hotel) => (
          <HotelCard key={hotel.id} {...hotel} />
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 mx-1 rounded-full ${
              currentSlide === index ? "bg-hotel-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotels;
