export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  trialExpiresAt?: string;
  createdAt: Date;
  updatedAt: Date;
} 