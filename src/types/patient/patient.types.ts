export interface Patient{
    id?:number
    firstName?:string;
    lastName?:string
    email?:string
    phone?:string
    gender?:string
    createdAt?:string
    updatedAt?:string
}

export interface CreatePatient{
    firstName?:string
    lastName?:string
    email?:string
    phone?:string
    gender?:string
}
export interface UpdatePatient extends Partial<CreatePatient> {id?:string}
