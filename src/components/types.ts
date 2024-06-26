export type Categoria = {
  id: number;
  name: string;
};

export type Product = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
};

export type CartProduct = Product & {
  quantity: number;
};
