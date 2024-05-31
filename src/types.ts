export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  is_public_domain: boolean;
  on_view: boolean;
  image_url?: string;
  is_on_view: boolean;
  artist_display: string;
}
