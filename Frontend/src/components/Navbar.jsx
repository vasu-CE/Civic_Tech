import React from "react";
import { Button } from "./ui/button";
import { Plus, BarChart, LineChart, Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector(state => state.user.user);
  return (
    <nav className="bg-white h-20 flex items-center fixed top-0 z-10 shadow-md w-full">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">Civic Connect</h1>

        {/* Menu Items */}
        <div className="flex items-center gap-4">
          <Link to="/home">
            <Button variant="outline" size="sm" className="">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>

          <Link to="/leaderboard">
            <Button variant="outline" size="sm" className="">
              <BarChart className="h-4 w-4 mr-2" />
              Leaderboard
            </Button>
          </Link>

          <Link to={`/profile/${user.id}`}>
            <Button variant="outline" size="sm" className="">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>

          <Link to="/analytics">
            <Button variant="outline" size="sm" className="">
              <LineChart className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 text-white ">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
