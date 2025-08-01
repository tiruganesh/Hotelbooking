
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-hotel-600">StayEasy</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-hotel-600 transition-colors">
            Home
          </Link>
          <Link to="/hotels" className="text-sm font-medium hover:text-hotel-600 transition-colors">
            Hotels
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">
              <User className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
          <Button size="sm" className="bg-hotel-600 hover:bg-hotel-700" asChild>
            <Link to="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
        
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-md p-4 space-y-3">
          <Link 
            to="/" 
            className="block py-2 text-sm font-medium hover:text-hotel-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/hotels" 
            className="block py-2 text-sm font-medium hover:text-hotel-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Hotels
          </Link>
          <Link 
            to="/deals" 
            className="block py-2 text-sm font-medium hover:text-hotel-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Deals
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-sm font-medium hover:text-hotel-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 text-sm font-medium hover:text-hotel-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            <Button variant="outline" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button size="sm" className="bg-hotel-600 hover:bg-hotel-700" asChild onClick={() => setIsMenuOpen(false)}>
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
