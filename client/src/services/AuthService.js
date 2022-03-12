
import  $api  from "../hooks/http.hook";

export default class AuthService{
  
  static async login(email, password) {
    console.log($api.post('/login', { email, password }))
    return $api.post('/login', { email, password })
    
  }
  static async registration(email, password) {
    console.log('oki')
    return $api.post('/registration', { email, password })
    
  }
  static async logout(){
    return $api.post('/logout')
    
  }
}

