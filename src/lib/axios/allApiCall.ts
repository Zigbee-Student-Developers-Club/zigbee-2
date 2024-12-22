import apiClient from "./axiosConfig";
import {
  createUsersError,
  createFetchEventsError,
  User,
  UsersResponse,
  UsersError,
  EventData,
  FetchEventsResponse,
  FetchEventsError,
} from "@/lib/types";
import { AxiosResponse } from "axios";

// 1. Check User Existence
export const checkUserExist = async (email: string): Promise<{ isRegistered: boolean }> => {
  try {
    const response: AxiosResponse<{ isRegistered: boolean }> = await apiClient.post("/api/check-user", { email });
    return response.data;
  } catch (error) {
    console.error("API Error in checkUserExist:", error);
    throw new Error("Failed to check user existence");
  }
};

// 2. Get OTP
export const getOtp = async (email: string): Promise<boolean> => {
  try {
    console.log(email);
    const response: AxiosResponse = await apiClient.post("/api/sendotp", { email });  // Corrected payload
    return response.status === 200;
  } catch (error) {
    console.error("API Error in getOtp:", error);
    return false;
  }
};


// 3. Verify Email OTP
export const verifyEmailOtp = async (email: string, otp: string): Promise<{ isProvidedBasicData?: boolean } | null> => {
  try {
    const response: AxiosResponse<{ isProvidedBasicData?: boolean }> = await apiClient.post("/api/verifyotp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("API Error in verifyEmailOtp:", error);
    return null;
  }
};

// 4. Upload User Data
export const uploadUserData = async (data: Partial<User>): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/users", data, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    console.error("API Error in uploadUserData:", error);
    return false;
  }
};

// 5. Upload Profile Image
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/api/update-profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("API Error in uploadProfileImage:", error);
    throw error;
  }
};

// 6. Fetch Contributors
export const fetchContributors = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/api/team", { withCredentials: true });
    console.log(response);
    
    return response.data.contributors;
  } catch (error) {
    console.error("API Error in fetchContributors:", error);
    throw error;
  }
};

// 7. Fetch Alumni
export const fetchAlumni = async (batch?: string): Promise<User[]> => {
  try {
    const response = await apiClient.get("/api/alumni", {
      withCredentials: true,
      params: batch ? { batch } : {},
    });
    return response.data.alumnus;
  } catch (error) {
    console.error("API Error in fetchAlumni:", error);
    throw error;
  }
};

// 8. Fetch Magazines
export const fetchMagazines = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/api/magazine", { withCredentials: true });
    return response.data.magazines;
  } catch (error) {
    console.error("API Error in fetchMagazines:", error);
    throw error;
  }
};

// 9. Fetch Resources
export const fetchResources = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/api/resource", { withCredentials: true });
    console.log(response.data);
    return response.data.resources;
  } catch (error) {
    console.error("API Error in fetchResources:", error);
    throw error;
  }
};
// 10. Fetch Events
export const fetchEvents = async (): Promise<EventData[] | FetchEventsError> => {
  try {
    const response = await apiClient.get("/api/event", {
      withCredentials: true, // Ensure that credentials (cookies) are included if needed
    });

    if (response.status !== 200) {
      const errorResponse: FetchEventsError = response.data;
      return errorResponse;
    }

    const data: FetchEventsResponse = response.data;
    return data.events;
  } catch (error) {
    console.error("API Error in fetchEvents:", error);
    return createFetchEventsError();
  }
};


// 11. Fetch Users
export const fetchUsers = async (
  role?: string,
  batch?: number,
  page: number = 1
): Promise<UsersResponse | UsersError> => {
  try {
    const queryParams = new URLSearchParams();
    if (role) queryParams.append("role", role);
    if (batch) queryParams.append("batch", batch.toString());
    queryParams.append("page", page.toString());

    const response = await apiClient.get(`/api/users?${queryParams.toString()}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // For sending cookies (if needed)
    });

    // Axios will not throw an error for non-2xx status codes by default, so you should check it manually.
    if (response.status !== 200) {
      const errorResponse: UsersError = response.data;
      return errorResponse;
    }

    const data: UsersResponse = response.data;
    return data;
  } catch (error) {
    console.error("API Error in fetchUsers:", error);
    return createUsersError();
  }
};


// 12. Delete User by ID
export const deleteUserById = async (id: string): Promise<{ message: string } | { error: string }> => {
  try {
    const response = await apiClient.delete(`/api/users/${id}`, {
      withCredentials: true,
    });

    
    if (response.status === 200) {
      
      return { message: "User deleted successfully." };
    } else {
     
      return { error: "Unexpected error in deleting user." };
    }
  } catch (error) {
    console.error("API Error in deleteUserById:", error);
    return { error: "Unexpected error in deleting user." };
  }
};


