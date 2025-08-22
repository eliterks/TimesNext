export interface Edition {
  id: number;
  title: string;
  date: string;
  description: string;
  coverImage: string;
  link: string;
  category: string;
  pages: number;
}

export interface EditionFormData {
  title: string;
  date: string;
  description: string;
  coverImage: string;
  link: string;
  category: string;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
