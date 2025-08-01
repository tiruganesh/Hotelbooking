
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, BedDouble, Wifi, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  discount?: number;
}

const HotelCard = ({
  id,
  name,
  location,
  price,
  rating,
  image,
  amenities,
  discount
}: HotelCardProps) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ));
  };

  // Function to render amenity icons
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      case "king bed":
      case "queen bed":
      case "double bed":
        return <BedDouble className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-48 w-full object-cover"
        />
        {discount && (
          <Badge className="absolute top-2 right-2 bg-booking-orange">
            {discount}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
          <div className="flex">{renderStars(rating)}</div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {renderAmenityIcon(amenity)}
              <span className="text-xs">{amenity}</span>
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline">+{amenities.length - 3} more</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">Perfect for 2-4 guests</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">per night</p>
          <p className="text-xl font-bold text-hotel-600">
            ${price}
            {discount && (
              <span className="text-sm line-through text-gray-400 ml-2">
                ${Math.round(price / (1 - discount / 100))}
              </span>
            )}
          </p>
        </div>
        
        <Link to={`/hotel/${id}`}>
          <Button className="bg-hotel-600 hover:bg-hotel-700">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
