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
  isProvidedBasicData: boolean;
}

interface UserDetails{

  name : string;
  batch : string;
  linkedInUrl : string ; 
  profileImg : string ;
  domain : string;
  phoneNumber : string ;
  aboutUser: string;
  aboutZigbee: string ; 
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

    if (response.status === 200 && typeof response.data.isRegistered === "boolean") {
      return response.data;
    }

    throw new Error(`Unexpected response format: ${JSON.stringify(response.data)}`);
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
    const response: AxiosResponse<verifyEmailOtpResponse> = await apiClient.post(
      "/api/verifyotp",
      data
    );

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error in verifyEmailOtp:", error.message);
    } else {
      console.error("Unexpected Error in verifyEmailOtp:", error);
    }
    return null;
  }
};

// 4. User information data post
export const uploadUserData = 
async (
  data: UserDetails
)  => {
  try {
    const response = await apiClient.post(
      "/api/users",
      data
    );

    if (response.status === 200 && typeof response.data.isProvidedBasicData === "boolean") {
      return response.data;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error in verifyEmailOtp:", error.message);
    } else {
      console.error("Unexpected Error in verifyEmailOtp:", error);
    }
    return null;
  }
};


