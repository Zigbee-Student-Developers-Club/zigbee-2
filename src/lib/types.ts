export interface UserData {
  name: string;
  batch: number;
  linkedInUrl: string;
  profileImg: string;
  domain: string;
  phoneNumber?: string;
  about?: string;
  position?: string;
  role?: string;
  isContributor?: boolean;
}

export interface FirebaseFetchUserType {
  id: string;
  [key: string]: unknown; // Additional dynamic fields from Firestore
}

export const validPositions = ["CR", "GR", "PC", "PV"];
export const validRoles = ["alumni", "admin", "guest"];
