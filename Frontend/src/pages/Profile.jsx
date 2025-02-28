import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { motion, AnimatePresence } from 'motion';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  User,
  Mail,
  MapPin,
  Edit,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  BarChart2,
  Camera
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';
import { BASE_URL } from '@/lib/constant';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user , setUser] = useState(null);
  const {userId} = useParams();
  
    useEffect(() => {
      const fetchProfile =async () => {
        try{
          const res = await axios.get(`${BASE_URL}/auth/get-profile/${userId}` , {withCredentials : true})

          if(res.data.success){
            console.log(res.data.data)
            setUser(res.data.data)
          }
        }catch(err){
          toast.error(err.message);
        }
      }
      fetchProfile();
    }, [userId])
  const activityData = [
    { name: 'Jan', issues: 4 },
    { name: 'Feb', issues: 3 },
    { name: 'Mar', issues: 6 },
    { name: 'Apr', issues: 4 },
    { name: 'May', issues: 7 },
    { name: 'Jun', issues: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500 mt-1">Member since {user?.joinedDate}</p>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{user?.address}</span>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
                        </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { title: 'Total Posted', value: user?.problemsPosted, icon: AlertCircle, color: 'blue' },
              { title: 'Resolved', value: user?.problemsResolved, icon: CheckCircle, color: 'green' },
              { title: 'In Progress', value: user?.inProgress, icon: Clock, color: 'yellow' },
              { title: 'Rating', value: user?.rating, icon: Award, color: 'purple' },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Card className="bg-white/90 backdrop-blur-xl border-none shadow-lg hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                      </div>
                      <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                        <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
                      </div>
                    </div>
                    </CardContent>
                  </Card>
              </motion.div>
                      ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/90 backdrop-blur-xl border-none shadow-lg h-full">
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="issues"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        dot={{ fill: '#4F46E5' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
          </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/90 backdrop-blur-xl border-none shadow-lg h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user?.recentActivity?.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <div className={`p-3 rounded-xl ${
                        activity.status === 'resolved' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {activity.status === 'resolved' ? <CheckCircle /> : <Clock />}
    </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <Badge className={`${
                        activity.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      } px-3 py-1 rounded-full`}>
                        {activity.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
