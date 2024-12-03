"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "./_components/User";
import Events from "./_components/Events";
import Gallery from "./_components/Gallery";
import Resources from "./_components/Resources";
import Magazines from "./_components/Magazines";
import UserTable from "./_components/UserTable";

const DashboardPage = () => {
  const tabs = [
    {
      value: "users",
      label: "users",
      component: () => <UserTable />, // Replace with your actual component
    },
    {
      value: "events",
      label: "Events",
      component: () => <Events />, // Replace with your actual component
    },
    {
      value: "gallery",
      label: "Gallery",
      component: () => <Gallery />, // Replace with your actual component
    },
    {
      value: "resources",
      label: "Resources",
      component: () => <Resources />, // Replace with your actual component
    },
    {
      value: "magazines",
      label: "Magazines",
      component: () => <Magazines />, // Replace with your actual component
    },
  ];
  return (
    <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex flex-wrap justify-start gap-2 rounded-lg p-2 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-8">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="p-4 bg-gray-100 rounded-lg shadow dark:bg-gray-800">
                {/* Dynamically render the component */}
                {tab.component()}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
