export interface Product {
    _id:string
    imageCover:string;
    images:[];
    title:string;
    category:{name?:string};
    price:number;
    ratingsAverage:number;
    description:string
    subcategory:{_id:string}
}
