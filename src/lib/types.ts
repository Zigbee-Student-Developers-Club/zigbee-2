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

export interface AlumniType {
  name: string;
  batch: number;
  profileImg: string;
  linkedInUrl: string;
  position: string;
  domain: string;
  about: string;
}

export interface ContributorType {
  name: string;
  batch: number;
  profileImg: string;
  linkedInUrl: string;
  isContributor: boolean;
  domain: string;
  position: string;
}

export interface ResourceType {
  name: string;
  url: string;
  domain: string;
  author: string;
  uploadedOn: string;
}

export interface MagazineType {
  title: string;
  url: string;
  image: string;
  uploadedOn: string;
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  batch: number;
}

export interface EventType {
  topic: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  speakers: Speaker[];
}

export const validPositions = ["CR", "GR", "PC", "PV"];
export const validRoles = ["alumni", "admin", "guest"];

export interface SwrType {
  error: Error | undefined;
  isValidating: boolean;
  isLoading: boolean;
}
