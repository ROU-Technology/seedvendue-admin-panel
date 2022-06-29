export interface CreateCategory {
  name: string;
  description: string;
  cover?: any;
}

export interface ReceivedCategory {
  name: string;
  description: string;
  cover?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  SubCategory: ReceivedSubCategory[];
}

export interface CreateSubCategory {
  name: string;
  description: string;
  categoryId: string;
}

export interface ReceivedSubCategory {
  name: string;
  description: string;
  categoryId: string;
  id: string;
  cover?: any;
  createdAt: string;
  updatedAt: string;
}
