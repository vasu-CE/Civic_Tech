import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MessageCircle, ThumbsUp, BarChart2, Shield } from 'lucide-react'
import MidPart from '@/components/MidPart'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-16">
          <h2 className="text-6xl text-center font-bold text-blue-700/90 mb-4 ">Report Public Issues, <br /> Improve Your City!</h2>
          <p className="text-xl text-gray-600 text-center mb-8">Civic Connect bridges the gap between citizens and local government, 
            making it easy to report issues,<br /> engage in community discussions, and drive positive change.</p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
        </section>

        <section id="features" className="mb-16">
          <h3 className="text-3xl font-bold text-blue-700 text-center mb-8">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                  Issue Reporting
                </CardTitle>
              </CardHeader>
              <CardContent>
                Easily report local problems with geo-tagging and photo uploads for quick resolution.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                  Community Voting
                </CardTitle>
              </CardHeader>
              <CardContent>
                Vote on reported issues to help prioritize the most pressing community concerns.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-orange-500" />
                  Public Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                Engage in meaningful conversations about local issues and proposed solutions.
              </CardContent>
            </Card>
          </div>
        </section>

        <MidPart />
        
        <section id="benefits" className="mb-16">
          <h3 className="text-3xl font-bold text-blue-700 text-center mb-8">Benefits</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="">
              <CardHeader>
                <CardTitle>For Citizens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center"><ThumbsUp className="mr-2 h-4 w-4 text-blue-500" /> Direct impact on local governance</p>
                <p className="flex items-center"><MessageCircle className="mr-2 h-4 w-4 text-blue-500" /> Enhanced community engagement</p>
                <p className="flex items-center"><Shield className="mr-2 h-4 w-4 text-blue-500" /> Increased transparency in issue resolution</p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>For Government</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-green-500" /> Efficient issue tracking and management</p>
                <p className="flex items-center"><BarChart2 className="mr-2 h-4 w-4 text-green-500" /> Data-driven decision making</p>
                <p className="flex items-center"><ThumbsUp className="mr-2 h-4 w-4 text-green-500" /> Improved citizen satisfaction and trust</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make a difference in your community?</h3>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Join Civic Connect Today</Button>
        </section>
      </main>

      <footer className="bg-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Civic Connect</h4>
              <p className="text-sm text-gray-600">Empowering citizens and governments to build better communities together.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">How It Works</a></li>
                <li><a href="#" className="hover:text-blue-600">Success Stories</a></li>
                <li><a href="#" className="hover:text-blue-600">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-gray-600">support@civicconnect.com</p>
              <p className="text-sm text-gray-600">1-800-CIVIC-HELP</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            &copy; 2024 Civic Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}