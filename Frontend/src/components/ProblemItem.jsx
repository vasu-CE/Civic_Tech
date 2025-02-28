import * as React from "react";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import img from "../assets/road.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import ProblemList from "./ProblemCard";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const problems = [
  {
    id: 1,
    title: "Broken Street Light",
    description:"Street light at Main St. and 5th Ave has been out for 2 weeks",
    category: "Infrastructure",
    status: "open",
    voteCount: 45,
    ratings: [],
    image: img,
    author: "John Doe",
    isAuthor: true,
  },
  {
    id: 2,
    title: "Garbage Collection Delay",
    description: "No garbage collection in Cedar neighborhood for past week",
    category: "Sanitation",
    status: "in-progress",
    voteCount: 32,
    rating: 3.8,
    image: img,
    author: "Jane Smith",
    isAuthor: false,
  },
];


const categories = [
  "All",
  "Infrastructure",
  "Sanitation",
  "Public Safety",
  "Transportation",
];
const statuses = ["All", "open", "in-progress", "resolved"];

export default function ProblemItem() {
  
  const user = useSelector((state) => state.user.user);
  const [role, setRole] = useState("user");
  useEffect(() => {
    if (user) {
      setRole(user.isGoverment ? "goverment" : "user");
    }
  }, [user])
  
  // console.log(user);
  const isGovOfficial = role === "goverment"; 
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  const problems = useSelector((state) => state.problem.problems);
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const filteredProblems = React.useMemo(() => {
    return problems?.filter(
      (problem) =>
        (selectedCategory === "All" || problem.category === selectedCategory) &&
        (selectedStatus === "All" || problem.status === selectedStatus) &&
        problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, selectedStatus, searchQuery]);

  const sortedProblems = React.useMemo(() => {
    const sorted = [...filteredProblems];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => b.id - a.id);
      case "voteCount":
        return sorted.sort((a, b) => b.voteCount - a.voteCount);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProblems, sortBy]);

  return (
    <SidebarProvider>
      <div className="grid grid-cols-[300px_1fr]">
        <Sidebar className="bg-white rounded-xl shadow-sm border border-gray-100 h-[84vh] m-5 mt-24">
          <SidebarContent className="p-6">
            <div className="mb-4">
              <Input
                placeholder="Search issues..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold text-gray-800">
                Categories
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                <SidebarMenu>
                  {categories.map((category) => (
                    <SidebarMenuItem key={category}>
                      <SidebarMenuButton
                        className={`w-full rounded-lg transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                        isActive={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span className="flex items-center gap-2">
                          {category}
                          <Badge variant="outline" className="ml-auto">
                            {
                              problems?.filter(
                                (p) =>
                                  category === "All" || p.category === category
                              ).length
                            }
                          </Badge>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <Separator className="my-6" />

            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold text-gray-800">
                Status
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                <SidebarMenu>
                  {statuses.map((status) => (
                    <SidebarMenuItem key={status}>
                      <SidebarMenuButton
                        className={`w-full rounded-lg transition-all duration-200 ${
                          selectedStatus === status
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                        isActive={selectedStatus === status}
                        onClick={() => setSelectedStatus(status)}
                      >
                        <span className="flex items-center gap-2">
                          {status}
                          <Badge variant="outline" className="ml-auto">
                            {
                              problems?.filter(
                                (p) => status === "All" || p.status === status
                              ).length
                            }
                          </Badge>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="bg-white rounded-xl min-w-[70vw] shadow-sm border border-gray-100 mb-6">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListFilter className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory} Issues
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-blue-600">{selectedStatus}</span>
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="voteCount">Most voteCount</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {role === "user" && (
                  <Link to="/report-issue">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Report Issue
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-[400px] w-[400px] animate-pulse"
                />
              ))}
            </div>
          ) : sortedProblems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="max-w-md mx-auto">
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you're
                  looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProblemList problem={problem} isGovOfficial={isGovOfficial} />

                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
