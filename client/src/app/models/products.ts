export interface Products{
    
        id: number;
        name: string;
        description: string;
        price: number;
        pictureUrl: string;
        type?: string;
        brand: string;
        quantityInStock?: number;
      

}

//? is used to make the property optional