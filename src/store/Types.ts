export type Book = {
  isbn: string;
  title: string;
  price: number;
  cover: string;
  synopsis: string[];
};

export type CartItem = {
  isbn: string;
  title: string;
  price: number;
  quantity: number;
};

export type CommercialOffer =
  | {
      type: "percentage" | "minus";
      value: number;
    }
  | {
      type: "slice";
      value: number;
      sliceValue: number;
    };
