export interface WatchlistItem {
  _id?: string;
  productName: string;
  source?: string;
  price?: number;
  currency?: string;
  unit?: string;
  createdAt?: Date;
}