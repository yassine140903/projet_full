export interface Article {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  createdAt: string;
  createdBy?: {_id : string, username : string, image : string, phoneNumber: string};
  location: string;
}
