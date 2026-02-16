// Common type definitions matching backend
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoUrl?: string;
  rating: number;
  totalRatings: number;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  trunkCapacity: 'small' | 'medium' | 'large';
  ownerId: number;
  owner?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: number;
  driverId: number;
  driver?: User;
  vehicleId: number;
  vehicle?: Vehicle;
  originCity: string;
  destinationCity: string;
  departurePoint: string;
  arrivalPoint: string;
  isTimeRange: boolean;
  departureTime: string;
  departureTimeEnd?: string;
  allowedLuggage: 'backpack' | 'carry_on' | 'large_suitcase';
  preferences?: {
    petFriendly?: boolean;
    music?: boolean;
    smoking?: boolean;
    airConditioning?: boolean;
  };
  additionalNotes?: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
  status: 'active' | 'full' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  tripId: number;
  trip?: Trip;
  passengerId: number;
  passenger?: User;
  seatsRequested: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// DTOs for API calls
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CreateVehicleDto {
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  trunkCapacity: 'small' | 'medium' | 'large';
}

export interface CreateTripDto {
  vehicleId: number;
  originCity: string;
  destinationCity: string;
  departurePoint: string;
  arrivalPoint: string;
  isTimeRange: boolean;
  departureTime: Date | string;
  departureTimeEnd?: Date | string;
  allowedLuggage: 'backpack' | 'carry_on' | 'large_suitcase';
  preferences?: {
    petFriendly?: boolean;
    music?: boolean;
    smoking?: boolean;
    airConditioning?: boolean;
  };
  additionalNotes?: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
  driverId: number;
}

export interface SearchTripDto {
  originCity?: string;
  destinationCity?: string;
  departureDate?: string;
  allowedLuggage?: 'backpack' | 'carry_on' | 'large_suitcase';
}

export interface CreateBookingDto {
  tripId: number;
  passengerId: number;
  seatsRequested: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
