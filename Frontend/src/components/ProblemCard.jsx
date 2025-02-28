import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  MoreVertical,
  Star,
  ThumbsUp,
  Clock,
  Calendar,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function ProblemCard({ problem, isGovOfficial }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);
  const [isVoted, setIsVoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(problem.voteCount);
  const [status, setStatus] = React.useState(problem.status);
  const [progress, setProgress] = React.useState(0);
  const [actionTaken, setActionTaken] = React.useState(false);

  const author = useSelector((state) => state.user.user);

  const handleRating = (rating) => {
    setUserRating(rating);
    // Add API call logic here
  };

  const handleVote = () => {
    if (!isVoted) {
      setVoteCount((prev) => prev + 1);
      setIsVoted(true);
    } else {
      setVoteCount((prev) => prev - 1);
      setIsVoted(false);
    }
    // Add API call logic here
  };

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    // API call to update status
  };

  const handleActionTake = () => {
    setActionTaken(true);
    setStatus("in-progress");
    setProgress(30);
    // API call to update action status
  };

  return (
    <Card className="group overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 rounded-xl border border-gray-100">
      <div className="relative aspect-[16/9]">
        <motion.img
          src={problem.image || "/placeholder.svg"}
          alt={problem.title}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            className={`px-3 py-1.5 text-sm font-medium rounded-full shadow-lg backdrop-blur-sm ${
              problem.status === "open"
                ? "bg-red-500/90 text-white hover:bg-red-500"
                : problem.status === "in-progress"
                ? "bg-yellow-400/90 text-black/90 hover:bg-yellow-400/90"
                : "bg-green-500/90 text-white hover:bg-green-500/90"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {problem.status}
            </div>
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4">
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm font-medium bg-white/90 text-gray-800 border-none shadow-lg backdrop-blur-sm"
          >
            {problem.category}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
                {problem.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Posted 2 days ago</span>
                </div>
              </div>
            </div>

            {problem.userId == author.id && !author.isGoverment && (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      Edit Issue
                    </DropdownMenuItem>

                    {!isGovOfficial && (
                      <DropdownMenuItem className="cursor-pointer text-red-500">
                        Delete Issue
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {problem.description}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={problem.authorAvatar || "/default-avatar.png"}
                alt={problem.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {problem.author}
              </p>
              <p className="text-xs text-gray-500">Community Member</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {!isGovOfficial &&
                [...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      index < userRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 hover:fill-yellow-400 hover:text-yellow-400"
                    }`}
                    onClick={() => handleRating(index + 1)}
                  />
                ))}

              <span className="text-sm text-gray-600 ml-2">
                ({problem.rating || 0})
              </span>
            </div>

            {!isGovOfficial && (
              <Button
                variant={isVoted ? "default" : "outline"}
                size="sm"
                onClick={handleVote}
                className={`flex items-center gap-2 ${
                  isVoted
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${isVoted ? "fill-white" : ""}`}
                />
                <span>{voteCount}</span>
              </Button>
            )}

            {isGovOfficial && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleActionTake}
                className="flex items-center bg-green-600 hover:bg-green-500 text-white gap-2"
              >
                Take Action
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProblemCard;
