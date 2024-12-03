import apiClient from "./axiosConfig";

//1. check user existance
interface email {
  email: string;
}
interface CheckUserExistResponse {
  message: string;
  success: boolean;
  isRegistered: boolean;
}
export const checkUserExist = async (
  data: email
): Promise<CheckUserExistResponse> => {
  return apiClient
    .post("/api/check-user", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

//2. get otp
export const getOtp = async (data: email) => {
  return apiClient
    .post("/api/sendotp", data)
    .then((response) => {
      if (response.status == 200) return true;
      else return false;
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};

//3. verify otp
interface userCredential {
  email: string;
  otp: string;
}
interface getUserDetails{
  message: string,
  success: boolean,
  isProvidedBasicData:boolean,
  authToken: string,
}

export const varifyOtp = async (data: userCredential): Promise<getUserDetails> => {
  return apiClient.post("/api/verifyotp", data).then((response) => {
    if(response.status == 200){
          return response.data
    }
  });
};

// // Example function for making a POST request
// export const postData = async (data) => {
//   try {
//     const response = await apiClient.post('/data', data);
//     return response.data;
//   } catch (error) {
//     console.error('Error posting data:', error);
//     throw error;
//   }
// };

// // Add other API call functions as needed
