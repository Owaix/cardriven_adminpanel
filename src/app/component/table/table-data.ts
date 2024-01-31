export interface Product {
    image: string,
    uname: string,
    gmail: string,
    productName: string,
    status: string,
    weeks: number,
    budget: string
}

export interface TableRows {
    fname: string,
    lname: string,
    uname: string,
}

export class CarsModel {
    id: number = 0;
    make: string = "";
    make_id: number = 0;
    model: string = "";
    model_id: number = 0;
    category: string = "";
    category_id: number | null = null;
    variant: string | null = null;
    variant_id: number = 0;
    year: number = 0;
    mileage: number = 0;
    price: string = "";
    negotiable: number = 0;
    old_price: number | null = null;
    slashamt: string = "";
    slash_perc: string = "";
    is_slash: number = 0;
    status: string = "";
    years: string = "";
    location: string = "";
    transmission: string = "";
    engine_type: string = "";
    defaultImg: string = "";
    description: string = "";
    parked_near: string = "";
    view_count: number = 0;
    is_feature: boolean | null = null;
    createdAt: string = "";
    created_date: string = "";
}


export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/user1.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Flexy React',
        status: 'danger',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Landing pro React',
        status: 'info',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Elite React	',
        status: 'warning',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user4.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Ample React',
        status: 'success',
        weeks: 35,
        budget: '95K'
    },

]

export const Employee: TableRows[] = [
    {
        fname: "Mark",
        lname: "Otto",
        uname: "@mdo",
    },
    {
        fname: "Jacob",
        lname: "Thornton",
        uname: "@fat",
    },
    {
        fname: "Larry",
        lname: "the Bird",
        uname: "@twitter",
    }
]