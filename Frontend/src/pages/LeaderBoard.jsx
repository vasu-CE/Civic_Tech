import React, { useState } from "react";
import { Search, Trophy, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  { rank: 1, name: "Meetpidev", points: 101, Problem: 12, avatar: "https://github.com/shadcn.png" },
  { rank: 2, name: "vasu-CE", points: 97, Problem: 11, avatar: "https://github.com/shadcn.png" },
  { rank: 3, name: "MitM123", points: 90, Problem: 8, avatar: "https://github.com/shadcn.png" },
  { rank: 4, name: "DhruvKO07", points: 88, Problem: 8, avatar: "https://github.com/shadcn.png" },
  { rank: 5, name: "soni-shashan", points: 66, Problem: 7, avatar: "https://github.com/shadcn.png" },
  { rank: 6, name: "nandit27", points: 50, Problem: 6, avatar: "https://github.com/shadcn.png" },
];



const getRankStyle = (rank) => {
  switch (rank) {
    case 1:
      return {
        icon: <Trophy className="w-6 h-6 text-yellow-500" />,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
      };
    case 2:
      return {
        icon: <Medal className="w-6 h-6 text-gray-400" />,
        bgColor: "bg-gray-100",
        textColor: "text-gray-700",
      };
    case 3:
      return {
        icon: <Medal className="w-6 h-6 text-amber-600" />,
        bgColor: "bg-amber-100",
        textColor: "text-amber-700",
      };
    default:
      return {
        icon: `#${rank}`,
        bgColor: "bg-gray-50",
        textColor: "text-gray-600",
      };
  }
};

const Leaderboard = () => {
  const [search, setSearch] = useState("");

  const filteredData = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-40 py-8 bg-gray-50">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground">
              Top contributors ranked by points and solved problems
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contributors..."
                className="pl-8 w-full md:w-[250px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-100/90 font-medium text-sm">
            <div>RANK</div>
            <div>USER</div>
            <div>POINTS</div>
            <div>PROBLEMS</div>
          </div>

          <div className="divide-y">
            {filteredData.map((user) => {
              const rankStyle = getRankStyle(user.rank);
              return (
                <div
                  key={user.rank}
                  className="grid grid-cols-4 gap-4 p-4 items-center  hover:bg-gray-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${rankStyle.bgColor} ${rankStyle.textColor} font-medium`}
                    >
                      {rankStyle.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div>
                    <Badge variant="secondary" className="font-semibold">
                      {user.points} pts
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.Problem}</span>
                    <Badge variant="outline">solved</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
