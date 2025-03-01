import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  Construction,
  Building2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { BASE_URL } from "@/lib/constant";
import axios from "axios";
import { toast } from "sonner";

const analyticsData = {
  totalIssues: 324,
  resolvedIssues: 156,
  rejectedIssues: 48,
  inProgressIssues: 89,
  pendingReview: 31,
  activeUsers: 1250,
  responseRate: 85,
  averageResolutionTime: "15 days",

  issueCategories: [
    { name: "Infrastructure", count: 98 },
    { name: "Envirounment", count: 76 },
    { name: "COMMUNITY_SERVICES", count: 65 },
    { name: "Electricity", count: 45 },
    { name: "Public Safety", count: 40 },
  ],

  statusDistribution: [
    {
      name: "Resolved",
      value: 156,
      color: "#10b981",
      label: "Resolved Issues",
    },
    { name: "In Progress", value: 89, color: "#6366f1", label: "In Progress" },
    { name: "Rejected", value: 48, color: "#ef4444", label: "Rejected" },
    { name: "Pending", value: 31, color: "#f59e0b", label: "Pending Review" },
  ],

  weeklyData: [
    { day: "Mon", reported: 15, resolved: 12, inProgress: 8 },
    { day: "Tue", reported: 18, resolved: 14, inProgress: 10 },
    { day: "Wed", reported: 22, resolved: 16, inProgress: 12 },
    { day: "Thu", reported: 20, resolved: 15, inProgress: 11 },
    { day: "Fri", reported: 25, resolved: 18, inProgress: 14 },
    { day: "Sat", reported: 17, resolved: 13, inProgress: 9 },
    { day: "Sun", reported: 12, resolved: 10, inProgress: 7 },
  ],

  recentActivity: [
    {
      type: "Resolved",
      title: "Road Pothole Repair",
      location: "Main Street",
      time: "2 hours ago",
    },
    {
      type: "In Progress",
      title: "Street Light Maintenance",
      location: "Park Avenue",
      time: "3 hours ago",
    },
    {
      type: "Reported",
      title: "Garbage Collection",
      location: "River Road",
      time: "5 hours ago",
    },
  ],

  monthlyData: [
    { month: "Jan", reported: 45, resolved: 38, inProgress: 15 },
    { month: "Feb", reported: 52, resolved: 45, inProgress: 18 },
    { month: "Mar", reported: 58, resolved: 50, inProgress: 20 },
    { month: "Apr", reported: 65, resolved: 55, inProgress: 25 },
    { month: "May", reported: 72, resolved: 60, inProgress: 28 },
    { month: "Jun", reported: 68, resolved: 58, inProgress: 22 },
    { month: "Jul", reported: 75, resolved: 65, inProgress: 24 },
    { month: "Aug", reported: 80, resolved: 70, inProgress: 26 },
    { month: "Sep", reported: 85, resolved: 72, inProgress: 30 },
    { month: "Oct", reported: 78, resolved: 68, inProgress: 25 },
    { month: "Nov", reported: 70, resolved: 62, inProgress: 20 },
    { month: "Dec", reported: 65, resolved: 58, inProgress: 18 },
  ],

  lastMonthData: [
    { date: "1 Nov", reported: 8, resolved: 4, inProgress: 3 },
    { date: "3 Nov", reported: 12, resolved: 6, inProgress: 4 },
    { date: "5 Nov", reported: 11, resolved: 7, inProgress: 3 },
    { date: "7 Nov", reported: 13, resolved: 8, inProgress: 4 },
    { date: "9 Nov", reported: 12, resolved: 7, inProgress: 4 },
    { date: "11 Nov", reported: 16, resolved: 10, inProgress: 5 },
    { date: "13 Nov", reported: 14, resolved: 9, inProgress: 4 },
    { date: "15 Nov", reported: 15, resolved: 10, inProgress: 4 },
    { date: "17 Nov", reported: 17, resolved: 12, inProgress: 4 },
    { date: "19 Nov", reported: 16, resolved: 11, inProgress: 4 },
    { date: "21 Nov", reported: 18, resolved: 12, inProgress: 5 },
    { date: "23 Nov", reported: 15, resolved: 9, inProgress: 5 },
    { date: "25 Nov", reported: 20, resolved: 12, inProgress: 6 },
    { date: "27 Nov", reported: 13, resolved: 8, inProgress: 3 },
    { date: "30 Nov", reported: 12, resolved: 7, inProgress: 4 },
  ],
};

const fetchAllData = async () => {
  try {
    const [
      analyticsRes,
      weeklyData,
      monthlyData,
      issueCategories,
      recentActivity,
    ] = await Promise.all([
      await axios.get(`${BASE_URL}/analytics/`, { withCredentials: true }),
      axios.get(`${BASE_URL}/analytics/weekly`, { withCredentials: true }),
      axios.get(`${BASE_URL}/analytics/monthly`, { withCredentials: true }),
      axios.get(`${BASE_URL}/analytics/categories`, {
        withCredentials: true,
      }),
      axios.get(`${BASE_URL}/analytics/recent-activity`, {
        withCredentials: true,
      }),
    ]);

    return {
      analytics: analyticsRes.data,
      weekly: weeklyData.data,
      lastMonth: monthlyData.data,
      categories: issueCategories.data,
      recentActivity: recentActivity.data,
    };
  } catch (error) {
    console.error("Error fetching analytics data", error);
    toast.error(error.message);
    return null;
  }
};

const StatCard = ({ title, value, icon, description, className }) => (
  <Card
    className={`p-6 space-y-2 hover:shadow-lg transition-shadow ${className}`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="p-2 rounded-full bg-muted">{icon}</div>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </Card>
);

const calculateLastMonthStats = (data) => {
  const totals = data.reduce(
    (acc, day) => {
      acc.resolved += day.resolved;
      acc.inProgress += day.inProgress;
      acc.reported += day.reported;
      acc.pending += day.reported - (day.resolved + day.inProgress);
      // console.log(acc.pending);
      return acc;
    },
    { resolved: 0, inProgress: 0, reported: 0, pending: 0 }
  );

  return [
    {
      name: "Reported",
      value: totals.reported,
      color: "#ef4444",
      label: "Reported",
    }, // Red for reported issues
    {
      name: "Resolved",
      value: totals.resolved,
      color: "#10b981",
      label: "Resolved Issues",
    }, // Green for success
    {
      name: "In Progress",
      value: totals.inProgress,
      color: "#3b82f6",
      label: "In Progress",
    }, // Blue for ongoing work
    {
      name: "Pending",
      value: totals.pending,
      color: "#f59e0b",
      label: "Pending Review",
    }, // Orange for waiting status
  ];
};

function Analytics() {
  const [data, setData] = useState({
    analytics: {},
    weekly: [],
    lastMonth: [],
    categories: [],
    recentActivity: [],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAllData();
      if (res) setData(res);
    };
    
    fetchData();
  }, []);
  
  // useEffect(() => {
  //   console.log("Updated Data:", data);
  // }, [data]);
  
  const lastMonthDistribution = calculateLastMonthStats(
    data.lastMonth
  );
  const lastMonthTotal = lastMonthDistribution.reduce(
    (sum, item) => sum + item.value,
    0
  );
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Civic Issues Analytics
          </h1>
          <p className="text-muted-foreground">
            Overview of reported civic issues and their resolution status
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Last updated: Just now
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={data.analytics.totalIssues}
          icon={<Building2 className="h-5 w-5 text-blue-600" />}
          description="Total reported issues"
        />
        <StatCard
          title="Resolved Issues"
          value={data.analytics.resolvedIssues}
          icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}
          description="Successfully resolved issues"
        />
        <StatCard
          title="In Progress"
          value={data.analytics.inProgressIssues}
          icon={<Construction className="h-5 w-5 text-indigo-600" />}
          description="Issues being addressed"
        />
        <StatCard
          title="Pending Review"
          value={data.analytics.pendingReview}
          icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
          description="Issues awaiting review"
        />
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              November 2023 Issue Trends
            </h3>
            <Badge variant="outline" className="text-sm">
              Last Month
            </Badge>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height={300}>
              {data?.lastMonth?.length > 0 ? (
                <AreaChart
                  data={data.lastMonth}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorReported"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorResolved"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorInProgress"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      value,
                      name.replace("Issues", "").trim(),
                    ]}
                  />
                  <Legend
                    formatter={(value) => value.replace("Issues", "").trim()}
                  />
                  <Area
                    type="monotone"
                    dataKey="reported"
                    stroke="#6366f1"
                    fill="url(#colorReported)"
                    name="Reported Issues"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    fill="url(#colorResolved)"
                    name="Resolved Issues"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stroke="#f59e0b"
                    fill="url(#colorInProgress)"
                    name="In Progress Issues"
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#aaa",
                  }}
                >
                  No data available for the last month.
                </div>
              )}
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing issue trends for November 2023
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Issue Categories</h3>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart
                  data={data.categories.issueCategories}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                November Status Distribution
              </h3>
              <Badge variant="outline" className="text-sm">
                Last Month
              </Badge>
            </div>
            <div className="h-[300px] relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={lastMonthDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {lastMonthDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                    <Label
                      content={({ viewBox: { cx, cy } }) => (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-muted-foreground text-lg font-medium"
                        >
                          {lastMonthTotal}
                          <tspan x={cx} y={cy + 20} className="text-sm">
                            November Total
                          </tspan>
                        </text>
                      )}
                    />
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: data.color }}
                              />
                              <span className="font-medium">{data.name}</span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {data.value} issues (
                              {Math.round((data.value / lastMonthTotal) * 100)}
                              %)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {lastMonthDistribution.map((status, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div
                    className="w-2 h-8 rounded-l-md mr-3"
                    style={{ backgroundColor: status.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{status.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {status.value} (
                      {Math.round((status.value / lastMonthTotal) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.recentActivity?.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <Badge
                  variant="outline"
                  className={
                    activity.status === "Resolved"
                      ? "text-green-500"
                      : activity.status === "In Progress"
                      ? "text-blue-500"
                      : "text-yellow-500"
                  }
                >
                  {activity.status}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {activity.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;