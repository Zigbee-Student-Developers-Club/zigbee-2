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
