
export type UserRole = 'freelancer' | 'client';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  age?: number;
  unitelMoney?: string;
  afriMoney?: string;
  aki?: string;
  multicaixaExpress?: string;
  nif?: string;
  province?: string;
  municipality?: string;
  neighborhood?: string;
  career?: string;
  role: UserRole;
  bio?: string;
  profilePic?: string;
  rating: number;
  onboarded: boolean;
  isVerified: boolean;
}

export interface Gig {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  createdAt: any;
  freelancerName?: string;
}

export interface Order {
  id: string;
  clientId: string;
  freelancerId: string;
  gigId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  paymentMethod: string;
  amount: number;
  createdAt: any;
}

export interface Chat {
  id: string;
  participants: string[];
  participantData: {
    [key: string]: {
      name: string;
      avatar?: string;
    };
  };
  lastMessage?: string;
  lastMessageAt?: any;
  lastMessageBy?: string;
  updatedAt: any;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: any;
}

