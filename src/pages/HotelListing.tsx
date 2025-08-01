
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelCard, { HotelCardProps } from "@/components/HotelCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock hotels data
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
  },
  {
    id: 7,
    name: "Lakefront Lodge",
    location: "Lake Tahoe, CA",
    price: 279,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Lake View", "Fireplace", "King Bed", "Private Dock"]
  },
  {
    id: 8,
    name: "Cityscape Hotel",
    location: "Chicago, IL",
    price: 239,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "City View", "Gym", "Room Service", "Conference Room"]
  },
  {
    id: 9,
    name: "Beachside Bungalows",
    location: "Maui, HI",
    price: 399,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Wifi", "Ocean View", "Private Beach", "Breakfast", "Spa"],
    discount: 5
  }
];

const HotelListing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState({
    priceRange: [50, 500] as [number, number],
    rating: 0,
    amenities: [] as string[],
  });
  
  const [sortBy, setSortBy] = useState("recommended");
  const [filteredHotels, setFilteredHotels] = useState<HotelCardProps[]>([]);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [searchLocation, setSearchLocation] = useState(queryParams.get("location") || "");
  
  // Apply filters and sorting to hotels
  useEffect(() => {
    let results = [...MOCK_HOTELS];
    
    // Apply location filter if provided
    if (searchLocation) {
      results = results.filter(hotel => 
        hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    // Apply price filter
    results = results.filter(
      hotel => hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.rating > 0) {
      results = results.filter(hotel => hotel.rating >= filters.rating);
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      results = results.filter(hotel => 
        filters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        )
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating-high-low":
        results.sort((a, b) => b.rating - a.rating);
        break;
      // For recommended (default), we don't need to sort as the data is already in that order
      default:
        break;
    }
    
    setFilteredHotels(results);
  }, [filters, sortBy, searchLocation]);
  
  // Parse URL parameters on page load
  useEffect(() => {
    const locationParam = queryParams.get("location");
    if (locationParam) {
      setSearchLocation(locationParam);
    }
    
    // You could also parse other URL parameters for check-in/out dates, guests, etc.
  }, [location.search]);
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Search Bar */}
        <div className="bg-hotel-700 py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="pl-10 pr-4 py-2.5 rounded-lg w-full"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setShowFilterSidebar(!showFilterSidebar)}
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-gray-100"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
              
              <div className="w-full sm:w-auto">
                <Select onValueChange={handleSortChange} defaultValue={sortBy}>
                  <SelectTrigger className="bg-white w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating-high-low">Rating: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden md:block w-64 shrink-0">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
            
            {/* Filter Sidebar - Mobile */}
            {showFilterSidebar && (
              <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                <div className="absolute right-0 h-full w-80 max-w-full bg-white p-4 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowFilterSidebar(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            )}
            
            {/* Hotel Listings */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {filteredHotels.length} Hotels{searchLocation ? ` in ${searchLocation}` : ""}
                </h1>
                
                <div className="hidden sm:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Sort By
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleSortChange("recommended")}>
                        Recommended
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange("price-low-high")}>
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange("price-high-low")}>
                        Price: High to Low
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange("rating-high-low")}>
                        Rating: High to Low
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} {...hotel} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters or search for a different location.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchLocation("");
                      setFilters({
                        priceRange: [50, 500],
                        rating: 0,
                        amenities: [],
                      });
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
              
              {filteredHotels.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mr-2">Previous</Button>
                  <Button variant="outline" className="bg-hotel-600 text-white hover:bg-hotel-700">1</Button>
                  <Button variant="outline" className="ml-2">Next</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelListing;
