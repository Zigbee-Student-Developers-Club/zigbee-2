import apiClient from "./axiosConfig";
import { AxiosResponse, AxiosError } from "axios";

// Define interfaces
interface EmailPayload {
  email: string;
}

interface UserExistenceResponse {
  isRegistered: boolean;
}

interface UserCredential {
  email: string;
  otp: string;
}

interface verifyEmailOtpResponse {
  isProvidedBasicData?: boolean;
  token?: string;
  error?: string;
  name?: string;
  profileImg?: string;
}

interface UserDetails {
  name: string;
  batch: number;
  linkedInUrl: string;
  profileImg: string;
  domain: string;
  phoneNumber?: string;
  // aboutUser: string;
  // aboutZigbee: string ;
}

// 1. Check User Existence
export const checkUserExist = async (
  data: EmailPayload
): Promise<UserExistenceResponse> => {
  try {
    const response: AxiosResponse<UserExistenceResponse> = await apiClient.post(
      "/api/check-user",
      data
    );

    if (
      response.status === 200 &&
      typeof response.data.isRegistered === "boolean"
    ) {
      return response.data;
    }

    throw new Error(
      `Unexpected response format: ${JSON.stringify(response.data)}`
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error in checkUserExist:", error.message);
    } else {
      console.error("Unexpected Error in checkUserExist:", error);
    }
    throw new Error("Failed to check user existence");
  }
};

// 2. Get OTP
export const getOtp = async (data: EmailPayload): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/sendotp", data);

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error in getOtp:", error.message);
    } else {
      console.error("Unexpected Error in getOtp:", error);
    }
    return false;
  }
};

// 3. Verify Email OTP
export const verifyEmailOtp = async (
  data: UserCredential
): Promise<verifyEmailOtpResponse | null> => {
  try {
    const response: AxiosResponse<verifyEmailOtpResponse> =
      await apiClient.post("/api/verifyotp", data);

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "API Error in verifyEmailOtp:",
        error.response?.data?.error
      );
      return error.response?.data;
    } else {
      console.error("Unexpected Error in verifyEmailOtp:", error);
    }
    return null;
  }
};

// 4. User Information Data Post (POST Method)
export const uploadUserData = async (data: UserDetails) => {
  try {
    const response = await apiClient.post("/api/users", data, {
      withCredentials: true,
    });

    if (
      response.status === 200 &&
      typeof response.data.isProvidedBasicData === "boolean"
    ) {
      return response.data;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error in uploadUserData:", error.message);
    } else {
      console.error("Unexpected Error in uploadUserData:", error);
    }
    return null;
  }
};

// 5. Upload user profile image
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      "/api/update-profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// 6. get contributors lists
export const fetchContributors = async () => {
  try {
    const response = await apiClient.get("/api/team", {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.contributors;
    } else {
      throw new Error("Failed to fetch contributors");
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);
    throw error;
  }
};

// 7. Get Alumni list
export const fetchAlumni = async (batch: string) => {
  try {
    const response = await apiClient.get("/api/alumni", {
      withCredentials: true,
      params: batch ? { batch } : {}, // If no batch, don't send the parameter
    });

    // Check if the response status is not 200
    if (response.status !== 200) {
      console.error("Error fetching alumni data:", response.data); // Log the response data
      throw new Error("Failed to fetch alumni data");
    }

    return response.data.alumnus;
  } catch (error) {
    console.error("Error fetching alumni data:", error);
    throw error;
  }
};

// 8. get magazine list
export const fetchMagazines = async () => {
  return apiClient
    .get("/api/magazine", { withCredentials: true })
    .then((response) => {
      // Return the magazine data from the response
      // console.log(response.data.magazines);
      return response.data.magazines;
    })
    .catch((error) => {
      console.error("Error fetching magazine list:", error);
      throw error; // Throw the error to be handled by the caller
    });
};

// 9. get resources list
export const fetchResources = async () => {
  return apiClient
    .get("/api/resource", { withCredentials: true })
    .then((response) => {
      // Return the resources data from the response
      // console.log(response.data.resources);
      return response.data.resources;
    })
    .catch((error) => {
      console.error("Error fetching magazine list:", error);
      throw error; // Throw the error to be handled by the caller
    });
};
