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

// SWR Hook: Fetch Contributors
export const useFetchContributors = (): {
  contributors: ContributorType[];
} & SwrType => {
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
export const useFetchAlumni = (
  batch: string
): {
  alumniData: AlumniType[];
} & SwrType => {
  const { data, error, isValidating } = useSWR(
    batch ? `alumni_${batch}` : "allAlumni",
    () => api.fetchAlumni(batch)
  );

  return {
    alumniData: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Magazines
export const useFetchMagazines = (): {
  magazineList: MagazineType[];
} & SwrType => {
  const { data, error, isValidating } = useSWR(
    "magazineList",
    api.fetchMagazines
  );

  return {
    magazineList: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};

// SWR Hook : Fetch Resources
export const useFetchResources = (): {
  resourceList: ResourceType[];
} & SwrType => {
  const { data, error, isValidating } = useSWR(
    "resourcesList",
    api.fetchResources
  );

  return {
    resourceList: data,
    isLoading: !data && !error,
    isValidating,
    error,
  };
};
