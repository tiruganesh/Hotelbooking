
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: {
    priceRange: [number, number];
    rating: number;
    amenities: string[];
  }) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [rating, setRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    amenities: true,
  });

  const amenitiesList = [
    "Wifi",
    "Pool",
    "Spa",
    "Gym",
    "Restaurant",
    "Room Service",
    "Parking",
    "Air Conditioning",
    "Breakfast Included",
    "Pet Friendly",
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleStarRatingSelect = (stars: number) => {
    setRating(stars === rating ? 0 : stars);
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(item => item !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      rating,
      amenities: selectedAmenities,
    });
  };

  const resetFilters = () => {
    setPriceRange([50, 500]);
    setRating(0);
    setSelectedAmenities([]);
    onFilterChange({
      priceRange: [50, 500],
      rating: 0,
      amenities: [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-fit">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-semibold">Price Range</h3>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        
        {expandedSections.price && (
          <>
            <div className="mb-4 mt-4">
              <Slider 
                defaultValue={[priceRange[0], priceRange[1]]} 
                min={0} 
                max={1000} 
                step={10}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </>
        )}
      </div>
      
      <Separator className="my-4" />
      
      {/* Star Rating Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="font-semibold">Star Rating</h3>
          {expandedSections.rating ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        
        {expandedSections.rating && (
          <div className="flex flex-col gap-2 mt-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div 
                key={stars} 
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                  rating === stars ? "bg-hotel-100" : ""
                }`}
                onClick={() => handleStarRatingSelect(stars)}
              >
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm">{stars === 5 ? "& up" : "& up"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Separator className="my-4" />
      
      {/* Amenities Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('amenities')}
        >
          <h3 className="font-semibold">Amenities</h3>
          {expandedSections.amenities ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        
        {expandedSections.amenities && (
          <div className="grid grid-cols-1 gap-3 mt-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox 
                  id={`amenity-${amenity}`} 
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label 
                  htmlFor={`amenity-${amenity}`}
                  className="text-sm"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button 
          onClick={applyFilters}
          className="w-full bg-hotel-600 hover:bg-hotel-700"
        >
          Apply Filters
        </Button>
        
        <Button 
          onClick={resetFilters}
          variant="outline" 
          className="w-full"
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
