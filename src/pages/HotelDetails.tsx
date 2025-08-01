
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Snowflake,
  Car,
  Tv,
  Heart,
  CalendarIcon,
  Users,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";

// Mock hotel data
const hotelData = {
  id: 1,
  name: "Grand Hyatt Hotel",
  location: "556 Central Park Ave, New York, NY 10024",
  description:
    "Experience luxury and comfort at the heart of Manhattan. The Grand Hyatt Hotel offers stunning views of Central Park, exceptional dining options, and world-class amenities to make your stay unforgettable. Our spacious rooms feature elegant decor, premium bedding, and all the modern conveniences you need for a relaxing stay. Located just steps from major attractions, shopping, and dining, this is the perfect base for exploring New York City.",
  price: 299,
  rating: 4.8,
  reviewCount: 487,
  discount: 15,
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ],
  amenities: [
    "Free WiFi",
    "Breakfast Included",
    "Swimming Pool",
    "Fitness Center",
    "Air Conditioning",
    "Parking",
    "Restaurant",
    "Room Service",
    "Spa",
    "Bar/Lounge",
    "Business Center",
    "Concierge Service",
    "Laundry Service",
    "Non-smoking Rooms",
    "24-hour Front Desk",
  ],
  rooms: [
    {
      id: 101,
      name: "Deluxe King Room",
      price: 299,
      discount: 15,
      description: "Spacious room with king-sized bed and city view.",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      beds: "1 King Bed",
      occupancy: "2 Guests",
      size: "400 sq ft",
      amenities: ["Free WiFi", "Flat-screen TV", "Air Conditioning", "Mini-bar"],
    },
    {
      id: 102,
      name: "Executive Suite",
      price: 499,
      description: "Luxury suite with separate living area and park view.",
      image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      beds: "1 King Bed",
      occupancy: "2 Guests",
      size: "650 sq ft",
      amenities: ["Free WiFi", "Flat-screen TV", "Air Conditioning", "Mini-bar", "Sitting Area", "Bathtub"],
    },
    {
      id: 103,
      name: "Double Queen Room",
      price: 349,
      discount: 10,
      description: "Comfortable room with two queen beds, ideal for families.",
      image: "https://images.unsplash.com/photo-1556784344-ad4c5a8c7172?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      beds: "2 Queen Beds",
      occupancy: "4 Guests",
      size: "450 sq ft",
      amenities: ["Free WiFi", "Flat-screen TV", "Air Conditioning", "Coffee Maker"],
    },
  ],
  reviews: [
    {
      id: 1,
      user: "John Smith",
      rating: 5,
      date: "2023-04-15",
      comment: "Exceptional service and beautiful rooms. The staff went above and beyond to make our stay special. Will definitely return!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      user: "Emily Johnson",
      rating: 4,
      date: "2023-03-22",
      comment: "Great location and comfortable beds. The only downside was the noise from the street, but that's expected in NYC.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      user: "Michael Brown",
      rating: 5,
      date: "2023-02-10",
      comment: "Loved the amenities, especially the rooftop pool. The breakfast was amazing with plenty of options.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ],
};

// Render amenity icon based on name
const getAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();
  
  if (lowerAmenity.includes("wifi")) return <Wifi className="h-5 w-5" />;
  if (lowerAmenity.includes("breakfast")) return <Coffee className="h-5 w-5" />;
  if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("dining")) return <Utensils className="h-5 w-5" />;
  if (lowerAmenity.includes("fitness") || lowerAmenity.includes("gym")) return <Dumbbell className="h-5 w-5" />;
  if (lowerAmenity.includes("air")) return <Snowflake className="h-5 w-5" />;
  if (lowerAmenity.includes("parking")) return <Car className="h-5 w-5" />;
  if (lowerAmenity.includes("tv")) return <Tv className="h-5 w-5" />;
  
  // Default icon if no match
  return <ThumbsUp className="h-5 w-5" />;
};

// Render star rating
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
              ? "fill-yellow-400 text-yellow-400 fill-half" // For half stars
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  
  // In a real app, you would fetch the hotel data based on the ID
  // For now, we'll just use our mock data
  const hotel = hotelData;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const increaseGuests = () => {
    if (guests < 10) setGuests(guests + 1);
  };
  
  const decreaseGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };
  
  // Calculate total price
  const calculateTotalPrice = (basePrice: number, discount?: number) => {
    if (!checkInDate || !checkOutDate) return basePrice;
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalBeforeDiscount = basePrice * nights;
    
    if (discount) {
      return totalBeforeDiscount * (1 - discount / 100);
    }
    
    return totalBeforeDiscount;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Hotel Images */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <ImageCarousel images={hotel.images} />
          </div>
        </section>
        
        {/* Hotel Information */}
        <section className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Hotel Details */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                  <div className="flex items-center mb-2">
                    <RatingStars rating={hotel.rating} />
                    <span className="ml-2 text-sm text-gray-600">
                      {hotel.rating} ({hotel.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-10 w-10 rounded-full ${
                    isFavorite ? "text-red-500 bg-red-50" : ""
                  }`}
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                </Button>
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">About This Hotel</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.slice(0, 9).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {getAmenityIcon(amenity)}
                      <span className="ml-2 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
                {hotel.amenities.length > 9 && (
                  <Button variant="link" className="mt-2 p-0 h-auto">
                    Show all {hotel.amenities.length} amenities
                  </Button>
                )}
              </div>
              
              {/* Rooms Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <Card key={room.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img 
                            src={room.image} 
                            alt={room.name} 
                            className="h-48 md:h-full w-full object-cover"
                          />
                        </div>
                        
                        <CardContent className="flex-1 p-4 flex flex-col">
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <div className="flex items-center">
                              {room.discount && (
                                <Badge className="mr-2 bg-booking-orange">
                                  {room.discount}% OFF
                                </Badge>
                              )}
                              <div className="text-right">
                                <p className="text-sm text-gray-500">per night</p>
                                <p className="text-xl font-bold text-hotel-600">
                                  ${room.price}
                                  {room.discount && (
                                    <span className="text-sm line-through text-gray-400 ml-2">
                                      ${Math.round(room.price / (1 - room.discount / 100))}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{room.description}</p>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {room.occupancy}
                            </Badge>
                            <Badge variant="outline">{room.beds}</Badge>
                            <Badge variant="outline">{room.size}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-100">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-auto flex justify-end">
                            <Button className="bg-hotel-600 hover:bg-hotel-700">
                              Book Now
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Reviews ({hotel.reviewCount})
                  </h2>
                  <Button variant="outline" className="text-sm">
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {hotel.reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <img 
                          src={review.avatar} 
                          alt={review.user} 
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{review.user}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <RatingStars rating={review.rating} />
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          
                          <div className="flex mt-3 gap-4">
                            <button className="text-gray-500 text-sm flex items-center hover:text-gray-700">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </button>
                            <button className="text-gray-500 text-sm flex items-center hover:text-gray-700">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reply
                            </button>
                            <button className="text-gray-500 text-sm flex items-center hover:text-gray-700">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-5 sticky top-20">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">Book Your Stay</h3>
                  {hotel.discount && (
                    <Badge className="bg-booking-orange">
                      {hotel.discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Check-in Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Check-out Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Guests</label>
                    <div className="flex border rounded-md overflow-hidden">
                      <button 
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                        onClick={decreaseGuests}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        className="flex-1 text-center px-3 py-2 border-0 focus:outline-none"
                        min="1"
                        max="10"
                      />
                      <button 
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                        onClick={increaseGuests}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Price Calculation */}
                  {checkInDate && checkOutDate && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>
                          ${hotel.price} x{" "}
                          {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                        </span>
                        <span>
                          ${calculateTotalPrice(hotel.price)}
                        </span>
                      </div>
                      
                      {hotel.discount && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({hotel.discount}%)</span>
                          <span>
                            -${(hotel.price * Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) * (hotel.discount / 100)).toFixed(2)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 mt-2">
                        <span>Total</span>
                        <span>${calculateTotalPrice(hotel.price, hotel.discount).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button className="w-full bg-booking-orange hover:bg-orange-600 text-white">
                    Book Now
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Bookmark className="h-4 w-4" />
                    <span>Free cancellation up to 24 hours before check-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetails;
