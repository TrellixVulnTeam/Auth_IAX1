
import  $api  from "../hooks/http.hook";

export default class UserService{
  
  static async fetchUsers(){
    return $api.get('/users')
    
  }
  
}