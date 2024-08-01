export interface sellerSignUpInterface {
    name: string,
    email: string,
    password: string
}

export interface sellerLoginInterface {
    email: string,
    password: string
}

export interface ProductInterface {
    product_name: string,
    product_price: Int32Array,
    product_color: string,
    product_category: string,
    product_description: string,
    product_image: string,
    id: number,
    quantity: undefined | number,
    productId: undefined | number
}

export interface CartInterface {
    product_name: string,
    product_price: Int32Array,
    product_color: string,
    product_category: string,
    product_description: string,
    product_image: string,
    id: number | undefined,
    quantity: undefined | number,
    userId: number,
    productId: number
}

export interface PriceSummaryInterface {
    price: number,
    discount: number,
    tax: number,
    delievery: number,
    totalAmount: number,
}

export interface CheckOutInterface {
    email: string,
    address: string,
    contact: string
}


export interface OrderNowInterface {
    email: string,
    address: string,
    contact: string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}



