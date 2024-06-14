class User{
    surname
    name
    patronim
    group_name
    email
    password
    image
    is_admin
    is_lecturer
    is_verified
    token_pass
    about_test
    
    constructor(surname,name,patronim,group_name,email,password,image,is_admin,is_lecturer,is_verified,token_pass,about_test){
        this.surname = surname
        this.name = name
        this.patronim = patronim
        this.group_name = group_name
        this.email = email
        this.password = password
        this.image = image
        this.is_admin = is_admin
        this.is_lecturer = is_lecturer
        this.is_verified = is_verified
        this.token_pass = token_pass
        this.about_test = about_test
    }

}

module.exports = User