"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Events from "./_components/Events";
import Gallery from "./_components/Gallery";
import Resources from "./_components/Resources";
import Magazines from "./_components/Magazines";
import UserTable from "./_components/UserTable";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { RefreshCw } from "lucide-react";
import { useFetchAlumni, useFetchContributors, useFetchEvents, useFetchMagazines, useFetchResources } from "@/lib/SWRhooks/useSWR";
import { toast } from "@/hooks/use-toast";

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


const DashboardPage = () => {
  const { refreshContributors } = useFetchContributors();
  const { refreshAlumni } = useFetchAlumni("");
  const { refreshMagazines } = useFetchMagazines();
  const { refreshResources } = useFetchResources();
  const { refreshEvents } = useFetchEvents();

  const handleRefresh = async () => {
    try {
      await Promise.all([
        refreshContributors(),
        refreshAlumni(),
        refreshMagazines(),
        refreshResources(),
        refreshEvents(),
      ]);
  
      toast({ description: "New feed updated successfully" });
    } catch (error) {
      console.error("Failed to refresh some data:", error);
      toast({ description: "Failed to update feeds",  });
    }
  };
  
  return (
    <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
      <div className="flex items-center justify-end space-x-2">
        <Text>Refresh new feeds here</Text>
        <Button className="bg-gray-200 text-black hover:bg-gray-300" onClick={handleRefresh}>
          <RefreshCw />
        </Button>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex flex-wrap justify-start gap-2 rounded-lg bg-transparent p-2">
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
              <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800">
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
