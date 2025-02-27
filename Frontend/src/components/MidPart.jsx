"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MidPart() {
  const [openAIItem, setOpenAIItem] = useState(null);

  const toggleAIItem = (item) => {
    setOpenAIItem(openAIItem === item ? null : item);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-3xl mb-12 text-blue-700 ">
        How It Works
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
        {[ 
          { step: "1", title: "Take a Photo", description: "Capture the issue with your phone or camera.", icon: "📸" },
          { step: "2", title: "Describe & Locate", description: "Add details and pin the exact location.", icon: "📍" },
          { step: "3", title: "Track Progress", description: "Get updates as your report is processed.", icon: "📊" }
        ].map((item, index) => (
          <Card
            key={index}
            className="bg-white w-full sm:w-[30%] text-center p-8 rounded-2xl border border-white/40 shadow-lg shadow-blue-200"
          >
            <CardContent className="p-0">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-xl font-bold bg-blue-600 text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center mb-4 shadow-md">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI-Powered Analysis */}
      <div className="flex justify-center mt-12">
        <Card className="bg-white shadow-lg text-gray-800 p-8 rounded-2xl border border-blue-200 w-full max-w-2xl">
          <h3 className="text-3xl font-semibold mb-6 text-blue-900 text-center">AI-Powered Analysis</h3>
          <div className="space-y-6">
            {[ 
              { title: "Image Recognition", description: "Uses AI to detect and classify issues from images." },
              { title: "Priority Assessment", description: "Determines issue severity to prioritize fixes." },
              { title: "Trend Analysis", description: "Identifies patterns in reported issues over time." },
              { title: "Resource Allocation", description: "Suggests optimal resource distribution for issue resolution." }
            ].map((item, index) => (
              <div key={index} className="border-b border-blue-100 pb-4 last:border-b-0 last:pb-0">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left font-medium text-blue-700 hover:text-blue-600"
                  onClick={() => toggleAIItem(item.title)}
                >
                  {item.title}
                  {openAIItem === item.title ? (
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                  )}
                </Button>
                {openAIItem === item.title && (
                  <p className="mt-2 text-gray-700 pl-4">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
