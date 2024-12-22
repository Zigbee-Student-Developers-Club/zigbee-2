"use client";
import useSWR from "swr";
import * as api from "@/lib/axios/allApiCall";
import {
  AlumniType,
  ContributorType,
  MagazineType,
  ResourceType,
  SwrType,
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
} & SwrType => {
  const { data, isLoading, isValidating, error } = useFetchData<
    ContributorType[]
  >("allContributors", api.fetchContributors);

  return {
    contributors: data || [],
    isLoading,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Alumni
export const useFetchAlumni = (
  batch: string
): {
  alumniData: AlumniType[];
} & SwrType => {
  const { data, isLoading, isValidating, error } = useFetchData<AlumniType[]>(
    batch ? `alumni_${batch}` : "allAlumni",
    () => api.fetchAlumni(batch)
  );

  return {
    alumniData: data || [],
    isLoading,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Magazines
export const useFetchMagazines = (): {
  magazineList: MagazineType[];
} & SwrType => {
  const { data, isLoading, isValidating, error } = useFetchData<MagazineType[]>(
    "magazineList",
    api.fetchMagazines
  );

  return {
    magazineList: data || [],
    isLoading,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Resources
export const useFetchResources = (): {
  resourceList: ResourceType[];
} & SwrType => {
  const { data, isLoading, isValidating, error } = useFetchData<ResourceType[]>(
    "resourcesList",
    api.fetchResources
  );

  return {
    resourceList: data || [],
    isLoading,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Events
export const useFetchEvents = () => {
  const { data, error, isValidating } = useSWR<EventData[] | FetchEventsError>("eventsList", api.fetchEvents);

  return {
    eventList: Array.isArray(data) ? data : [],
    error: !Array.isArray(data) ? (data as FetchEventsError)?.error : null,
    isLoading: !data && !error,
    isValidating,
  };
};

// SWR Hook: Fetch Users
export const useFetchUsers = (role?: string, batch?: number, page: number = 1) => {
  const key = `/api/users?role=${role || ""}&batch=${batch || ""}&page=${page}`;

  const { data, error, isValidating } = useSWR<UsersResponse | UsersError>(key, () =>
    api.fetchUsers(role, batch, page)
  );

  // Mutate function for refreshing data manually
  const refreshUsers = () => {
    mutate(key);
  };

  return {
    userList: isUsersResponse(data) ? data.users.results : [],
    pagination: isUsersResponse(data)
      ? {
          totalPages: data.users.total_page,
          currentPage: data.users.current_page,
          nextPage: data.users.next,
          previousPage: data.users.previous,
        }
      : null,
    message: isUsersResponse(data) ? data.message : null,
    error: error || (!isUsersResponse(data) ? (data as UsersError)?.error : null),
    isLoading: !data && !error,
    isValidating,
    refreshUsers,
  };
};
