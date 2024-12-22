export interface UserData {
  id?: string;
  email: string;
  name: string;
  profileImg: string;
  phoneNumber: string;
  batch?: string;
  linkedInUrl?: string;
  domain?: string;
  about?: string;
  feedback?: string;
  position?: "CR" | "GR" | "PC" | "PV" | "";
  role?: "student" | "alumni" | "guest";
  isContributor?: boolean;
  isAdmin?: boolean;
  isProvidedBasicData?: boolean;
}

export const validPositions = ["CR", "GR", "PC", "PV", ""];
export const validRoles = ["student", "alumni", "guest"];

export interface AlumniType {
  id?: string;
  name: string;
  batch: number;
  profileImg: string;
  linkedInUrl: string;
  position: string;
  domain: string;
  about: string;
}

export interface ContributorType {
  id?: string;
  name: string;
  batch: number;
  profileImg: string;
  linkedInUrl: string;
  isContributor: boolean;
  domain: string;
  position: string;
}

export interface ResourceType {
  id?: string;
  name: string;
  url: string;
  domain: string;
  author: string;
  uploadedOn: string;
}

export interface MagazineType {
  id?: string;
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
  id?: string;
  topic: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  speakers: Speaker[];
}

export interface SwrType {
  error: Error | undefined;
  isValidating: boolean;
  isLoading: boolean;
}

export interface UsersResponse {
  users: {
    total_page: number;
    current_page: number;
    previous: string | null;
    next: string | null;
    results: UserData[];
  };
  message: string;
}
