export class User {

    constructor(
        private id : string ,
        private username : string,
        private email : string,
        private phoneno : number,
        private token : string 
    ){}

        get userToken(){
        return this.token
    }

}


export class Admin {
    constructor(
        private id : string ,
        private email : string,
        private token : string 
    ){}
}





export class OtpUser {
    constructor(
        private username : string,
        private email : string,
        private phoneno : number,
        private password : string
    ){}
}
