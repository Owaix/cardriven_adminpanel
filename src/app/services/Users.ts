export class User {
    id: string = '';
    name: string = '';
    email: string = '';
    password: string = '';
    phone: string = '';
    profilePic: File | null = null;
    address: string = '';
    address2: string = '';
    image: string = '';
    token: string = '';
    isImage: boolean = true;
}

export class Ddl {
    id: number = 0;
    title: string = '';
}

export interface CarMake {
    id: number;
    title: string;
    models: CarModel[];
}

export interface CarModel {
    id: number;
    title: string;
    years: number[];
}

export class CustomFile extends File {
    CloudFileName: string = '';
}

export class CarDetail {
    seating_capacity: string = '';
    engine_size: string = '';
    gear: string = '';
    fuel_consumption: string = '';
    feature_list: string[] = [];
    advance_feature: string[] = [];
    techSpecs_list: techSpecs[] = [];
}

export class techSpecs {
    header: string = '';
    detail: Details[] = [];
}

export class Details {
    key: string = '';
    value: string = '';
}
