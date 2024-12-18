"use client";
import useSWR from 'swr';
import * as api from "@/lib/axios/allApiCall";


// SWR Hook: Fetch Contributors
export const useFetchContributors = () => {
  const { data, error, isValidating } = useSWR(
    "allContributors", 
    api.fetchContributors
  );

  return {
    contributors: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook: Fetch Alumni
export const useFetchAlumni = (batch: string) => {
  const { data, error, isValidating } = useSWR(
    batch ? `alumni_${batch}` : "allAlumni",
    () => api.fetchAlumni(batch)
  );

  return {
    alumni: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Magazines
export const useFetchMagazines = () => {
  const { data, error, isValidating } = useSWR("magazineList", api.fetchMagazines);

  return {
    magazineList: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Resources
export const useFetchResources = () => {
  const { data, error, isValidating } = useSWR("resourcesList", api.fetchResources);

  return {
    magazineList: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};
