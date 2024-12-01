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
export const checkUserExist = async (data: email): Promise<CheckUserExistResponse> => {
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




//1. check user existance 
interface CheckUserExistRequest {
  email: string;
}
interface CheckUserExistResponse {
  message: string;
  success: boolean;
  isRegistered: boolean;
}
export const getOtp = async (data: CheckUserExistRequest) => {
  return apiClient
  .post("/api/check-user", data)
  .then((response) => {
    if(response.status == 200) return true; 
    else return false;
    
  })
  .catch((error) => {
    console.error("Error:", error); 
    throw error; 
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
