"use client";

import useSWR, { mutate } from "swr";
import * as api from "@/lib/axios/allApiCall";
import {
  User,
  UsersResponse,
  UsersError,
  EventData,
  FetchEventsError,
} from "@/lib/types";

// Utility Type Guard to check UsersResponse
const isUsersResponse = (data: unknown): data is UsersResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "users" in data &&
    typeof (data as UsersResponse).users === "object"
  );
};

// SWR Hook: Fetch Contributors
export const useFetchContributors = () => {
  const { data, error, isValidating } = useSWR<User[]>("allContributors", api.fetchContributors);

  return {
    contributors: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Alumni
export const useFetchAlumni = (batch: string) => {
  const { data, error, } = useSWR<User[]>(
    batch ? `alumni_${batch}` : "allAlumni",
    () => api.fetchAlumni(batch)
  );

  return {
    alumni: data,
    isLoading: data === undefined && !error,
    error,
  };
};

// SWR Hook: Fetch Magazines
export const useFetchMagazines = () => {
  const { data, error, isValidating } = useSWR<any[]>("magazineList", api.fetchMagazines);

  return {
    magazineList: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Resources
export const useFetchResources = () => {
  const { data, error, isValidating } = useSWR<any[]>("resourcesList", api.fetchResources);
  console.log(data , " swr");
  
  return {
    resourcesList: data,
    isLoading: !data && !error,
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
