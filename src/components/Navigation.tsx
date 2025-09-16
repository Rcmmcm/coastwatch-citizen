import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Waves, MapPin, AlertTriangle, User, Info } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Waves },
    { href: "/map", label: "Live Map", icon: MapPin },
    { href: "/report", label: "Report", icon: AlertTriangle },
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/about", label: "About", icon: Info },
  ];

  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <div className={`${mobile ? "flex flex-col space-y-4" : "hidden md:flex md:space-x-6"}`}>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          onClick={onItemClick}
          className={`flex items-center space-x-2 text-sm font-medium transition-smooth hover:text-primary ${
            location.pathname === href ? "text-primary" : "text-muted-foreground"
          } ${mobile ? "w-full p-2" : ""}`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 ocean-gradient rounded-lg flex items-center justify-center">
              <Waves className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Coastal Sentinel</span>
          </Link>
        </div>

        <NavItems />

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex md:space-x-2">
            <Link to="/map">
              <Button variant="outline" size="sm">
                View Map
              </Button>
            </Link>
            <Link to="/report">
              <Button size="sm" className="ocean-gradient shadow-ocean">
                Report Hazard
              </Button>
            </Link>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-6 mt-6">
                <NavItems mobile onItemClick={() => setIsOpen(false)} />
                <div className="flex flex-col space-y-2">
                  <Link to="/map" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      View Map
                    </Button>
                  </Link>
                  <Link to="/report" onClick={() => setIsOpen(false)}>
                    <Button className="w-full ocean-gradient shadow-ocean">
                      Report Hazard
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;