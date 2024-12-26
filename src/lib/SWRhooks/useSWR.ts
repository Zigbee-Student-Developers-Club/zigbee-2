"use client";
import useSWR, { mutate } from "swr";
import * as api from "@/lib/axios/allApiCall";
import {
  AlumniType,
  ContributorType,
  MagazineType,
  ResourceType,
  SwrType,
  EventType,
  UsersResponse,
} from "../types";

// generic useFetchData hook for reusability
const useFetchData = <T>(
  key: string,
  fetcher: (key: string) => Promise<T>
): { data: T | undefined } & SwrType => {
  const { data, error, isValidating } = useSWR(key, fetcher);

  return {
    data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Contributors
export const useFetchContributors = (): {
  contributors: ContributorType[];
  refreshContributors: () => void;
} & SwrType => {
  const key = "allContributors";

  const { data, isLoading, isValidating, error } = useFetchData<ContributorType[]>(
    key,
    api.fetchContributors
  );

  // Manual refresh function
  const refreshContributors = () => {
    mutate(key);
  };

  return {
    contributors: data || [],
    isLoading,
    isValidating,
    error,
    refreshContributors,
  };
};


// SWR Hook: Fetch Alumni
export const useFetchAlumni = (
  batch: string
): {
  alumniData: AlumniType[];
  refreshAlumni: () => void;
} & SwrType => {
  const key = batch ? `alumni_${batch}` : "allAlumni";

  const { data, isLoading, isValidating, error } = useFetchData<AlumniType[]>(
    key,
    () => api.fetchAlumni(batch)
  );

  // Manual refresh function
  const refreshAlumni = () => {
    mutate(key);
  };

  return {
    alumniData: data || [],
    isLoading,
    isValidating,
    error,
    refreshAlumni,
  };
};
// SWR Hook: Fetch Magazines
export const useFetchMagazines = (): {
  magazineList: MagazineType[];
  refreshMagazines: () => void;
} & SwrType => {
  const key = "magazineList";

  const { data, isLoading, isValidating, error } = useFetchData<MagazineType[]>(
    key,
    api.fetchMagazines
  );

  // Manual refresh function
  const refreshMagazines = () => {
    mutate(key);
  };

  return {
    magazineList: data || [],
    isLoading,
    isValidating,
    error,
    refreshMagazines,
  };
};

// SWR Hook: Fetch Resources
export const useFetchResources = (): {
  resourceList: ResourceType[];
  refreshResources: () => void;
} & SwrType => {
  const key = "resourcesList";

  const { data, isLoading, isValidating, error } = useFetchData<ResourceType[]>(
    key,
    api.fetchResources
  );

  // Manual refresh function
  const refreshResources = () => {
    mutate(key);
  };

  return {
    resourceList: data || [],
    isLoading,
    isValidating,
    error,
    refreshResources,
  };
};

// SWR Hook: Fetch Events
export const useFetchEvents = (): {
  eventList: EventType[];
  refreshEvents: () => void;
} & SwrType => {
  const key = "eventsList";

  const { data, isLoading, isValidating, error } = useFetchData<EventType[]>(
    key,
    api.fetchEvents
  );

  // Manual refresh function
  const refreshEvents = () => {
    mutate(key);
  };

  return {
    eventList: data || [],
    isLoading,
    isValidating,
    error,
    refreshEvents,
  };
};

// SWR Hook: Fetch Users
export const useFetchUsers = (
  role?: string,
  batch?: string,
  page: number = 1,
  isAdmin: boolean = false,
  isContributor: boolean = false
) => {
  const key = `/api/admin/users?role=${role || ""}&batch=${batch || ""}&page=${page}&admin=${isAdmin}&contributor=${isContributor}`;

  const { data, error, isValidating } = useSWR<UsersResponse>(key, () =>
    api.fetchUsers(role, batch, page, isAdmin, isContributor)
  );

  // Mutate function for refreshing data manually
  const refreshUsers = () => {
    mutate(key);
  };

  return {
    userList: data ? data.users.results : [],
    pagination: data
      ? {
          totalPages: data.users.total_page,
          currentPage: data.users.current_page,
          nextPage: data.users.next,
          previousPage: data.users.previous,
        }
      : null,
    message: data ? data.message : null,
    error: error,
    isLoading: !data && !error,
    isValidating,
    refreshUsers,
  };
};

// SWR Hook : user profile
export const useFetchUserProfile = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    "userProfile",
    api.getUserProfile,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  // Optional: Allow manual refresh if needed
  const refreshUserProfile = () => {
    mutate("userProfile");
  };

  return {
    userProfile: data || null,
    isLoading,
    isValidating,
    error,
    refreshUserProfile,
  };
};
