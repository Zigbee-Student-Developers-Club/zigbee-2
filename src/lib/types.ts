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


// Utility for creating default values for types
export const createUser = (): User => ({
  id: "",
  isContributor: false,
  linkedInUrl: "",
  profileImg: "",
  role: "",
  name: "",
  position: "",
  batch: 0,
  phoneNumber: "",
  about: "",
  domain: "",
});

export const createUsersResponse = (): UsersResponse => ({
  users: {
    total_page: 0,
    current_page: 0,
    previous: null,
    next: null,
    results: [],
  },
  message: "",
});

export const createUsersError = (): UsersError => ({
  error: "",
});

export const createSpeaker = (): Speaker => ({
  company: "",
  name: "",
  batch: 0,
  role: "",
});

export const createEventData = (): EventData => ({
  id: "",
  speakers: [],
  thumbnail: "",
  location: "",
  topic: "",
  eventDate: "",
});

export const createFetchEventsResponse = (): FetchEventsResponse => ({
  events: [],
});

export const createFetchEventsError = (): FetchEventsError => ({
  error: "",
});

// Interfaces and Types
export interface User {
  id: string;
  isContributor: boolean;
  linkedInUrl: string;
  profileImg: string;
  role: string;
  name: string;
  position: string;
  batch: number;
  phoneNumber: string;
  about: string;
  domain: string;
}

export interface UsersResponse {
  users: {
    total_page: number;
    current_page: number;
    previous: string | null;
    next: string | null;
    results: User[];
  };
  message: string;
}

export interface UsersError {
  error: string;
}

export interface Speaker {
  company: string;
  name: string;
  batch: number;
  role: string;
}

export interface EventData {
  id: string;
  speakers: Speaker[];
  thumbnail: string;
  location: string;
  topic: string;
  eventDate: string;
}

export interface FetchEventsResponse {
  events: EventData[];
}

export interface FetchEventsError {
  error: string;
}

