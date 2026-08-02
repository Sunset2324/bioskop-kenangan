export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface Movie {
  id: string;
  category_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  gdrive_file_id: string;
  created_at: string;
}
