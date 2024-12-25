import apiClient from "./axiosConfig";
import {
  AlumniType,
  ContributorType,
  EventType,
  MagazineType,
  ResourceType,
  UserData,
  UsersResponse,
} from "@/lib/types";
import { AxiosResponse, AxiosError } from "axios";

// 1. Check User Existence
export const checkUserExist = async (
  email: string
): Promise<{ isRegistered: boolean }> => {
  try {
    const response: AxiosResponse<{ isRegistered: boolean }> =
      await apiClient.post("/api/check-user", { email });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in checkUserExist:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to check user existence"
      );
    }
    // console.error("Unexpected Error in checkUserExist:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in checkUserExist."
    );
  }
};

// 2. Get OTP
export const getOtp = async (email: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/sendotp", {
      email,
    });
    if (response.status === 200) {
      return true;
    }
    throw new Error("Failed to send OTP.");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in getOtp:", error.message);
      throw new Error(error.response?.data?.error || "Failed to send OTP.");
    }
    // console.error("Unexpected Error in getOtp:", error);
    throw new Error((error as Error).message || "Unexpected error in getOtp.");
  }
};

// 3. Verify Email OTP
export const verifyEmailOtp = async (
  email: string,
  otp: string
): Promise<{
  isProvidedBasicData?: boolean;
  isAdmin?: boolean;
  token?: string;
  name?: string;
  profileImg?: string;
} | null> => {
  try {
    const response: AxiosResponse<{ isProvidedBasicData?: boolean }> =
      await apiClient.post("/api/verifyotp", {
        email,
        otp,
      });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in verifyEmailOtp:", error.response?.data?.error);
      throw new Error(
        error.response?.data?.error || "Failed to verify email OTP."
      );
    }
    // console.error("Unexpected Error in verifyEmailOtp:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in verifyEmailOtp."
    );
  }
};

// 4. Upload User Data
export const uploadUserData = async (
  data: Partial<UserData>
): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/user", data, {
      withCredentials: true,
    });
    if (response.status === 201) {
      return true;
    }
    throw new Error("Failed to upload user data.");
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error("API Error in uploadUserData:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to upload user data."
      );
    }
    // console.error("Unexpected Error in uploadUserData:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in uploadUserData."
    );
  }
};

// 5. Upload Profile Image
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      "/api/update-profile-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data?.secureUrl;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in uploadProfileImage:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to upload profile image."
      );
    }
    // console.error("Unexpected Error in uploadProfileImage:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in uploadProfileImage."
    );
  }
};

// 6. Fetch Contributors
export const fetchContributors = async (): Promise<ContributorType[]> => {
  try {
    const response = await apiClient.get("/api/team", {
      withCredentials: true,
    });
    return response.data.contributors;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchContributors:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to fetch contributors."
      );
    }
    // console.error("Unexpected Error in fetchContributors:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchContributors."
    );
  }
};

// 7. Fetch Alumni
export const fetchAlumni = async (batch?: string): Promise<AlumniType[]> => {
  try {
    const response = await apiClient.get("/api/alumni", {
      withCredentials: true,
      params: batch ? { batch } : {},
    });
    return response.data.alumnus;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchAlumni:", error.message);
      throw new Error(error.response?.data?.error || "Failed to fetch alumni.");
    }
    // console.error("Unexpected Error in fetchAlumni:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchAlumni."
    );
  }
};

// 8. Fetch Magazines
export const fetchMagazines = async (): Promise<MagazineType[]> => {
  try {
    const response = await apiClient.get("/api/magazine", {
      withCredentials: true,
    });
    return response.data.magazines;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchMagazines:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to fetch magazines."
      );
    }
    // console.error("Unexpected Error in fetchMagazines:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchMagazines."
    );
  }
};

// 9. Fetch Resources
export const fetchResources = async (): Promise<ResourceType[]> => {
  try {
    const response = await apiClient.get("/api/resource", {
      withCredentials: true,
    });
    return response.data.resources;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchResources:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to fetch resources."
      );
    }
    // console.error("Unexpected Error in fetchResources:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchResources."
    );
  }
};

// 10. Fetch Events
export const fetchEvents = async (): Promise<EventType[]> => {
  try {
    const response = await apiClient.get("/api/event", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data.events;
    }
    throw new Error("Failed to fetch events");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchEvents:", error.message);
      throw new Error(error.response?.data?.error || "Failed to fetch events.");
    }
    // console.error("Unexpected Error in fetchEvents:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchEvents."
    );
  }
};

export const fetchUsers = async (
  role?: string,
  batch?: string,
  page: number = 1,
  isAdmin: boolean = false,
  isContributor: boolean = false
): Promise<UsersResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (role) queryParams.append("role", role);
    if (batch) queryParams.append("batch", batch.toString());
    if (isAdmin) queryParams.append("isadmin", String(isAdmin));
    if (isContributor)
      queryParams.append("iscontributor", String(isContributor));
    queryParams.append("page", page.toString());

    const response = await apiClient.get(
      `/api/admin/users?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to fetch users");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in fetchUsers:", error.message);
      throw new Error(error.response?.data?.error || "Failed to fetch users.");
    }
    // console.error("Unexpected Error in fetchUsers:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in fetchUsers."
    );
  }
};

// 12. Update User by ID (Admin Only)
export const updateUserById = async (
  id: string,
  userData: UserData
): Promise<{ message: string } | { error: string }> => {
  try {
    const response = await apiClient.put(`/api/admin/users/${id}`, userData, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Unexpected response from server.");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in updateUserById:", error.message);
      throw new Error(
        error.response?.data?.error ||
          "Unexpected error in updating user details."
      );
    }
    // console.error("Unexpected Error in updateUserById:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in updating user details."
    );
  }
};

// 13. Delete User by ID (Admin Only)
export const deleteUserById = async (
  id: string
): Promise<{ message: string } | { error: string }> => {
  try {
    const response = await apiClient.delete(`/api/admin/users/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return { message: "User deleted successfully." };
    }
    throw new Error("Unexpected error in deleting user.");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // console.error("API Error in deleteUserById:", error.message);
      throw new Error(
        error.response?.data?.error || "Unexpected error in deleting user."
      );
    }
    // console.error("Unexpected Error in deleteUserById:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in deleting user."
    );
  }
};

// 14. get user profile data
export const getUserProfile = async (): Promise<UserData | null> => {
  try {
    const response = await apiClient.get<{ user: UserData }>("/api/user", {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.user;
    }
    throw new Error("Failed to fetch user profile.");
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error("API Error in getUserProfile:", error.message);
      throw new Error(
        error.response?.data?.error || "Error fetching user profile ."
      );
    }
    // console.error("Error fetching user profile:", error);
    throw new Error((error as Error).message || "Error fetching user profile.");
  }
};

// 15. update the user profile by the user with Authentication

export const updateUserData = async (
  data: Partial<UserData>
): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.put("/api/user", data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return true;
    }
    throw new Error("Failed to upload user data.");
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error("API Error in uploadUserData:", error.message);
      throw new Error(
        error.response?.data?.error || "Failed to upload user data."
      );
    }
    // console.error("Unexpected Error in uploadUserData:", error);
    throw new Error(
      (error as Error).message || "Unexpected error in uploadUserData."
    );
  }
};
