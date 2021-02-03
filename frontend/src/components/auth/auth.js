let Authenticated=null  
    
class Auth {

   
    
    isAuthenticated(){
      console.log(localStorage.getItem('status'))
      

      localStorage.getItem('status')? Authenticated=true : Authenticated=false;

     console.log("Authenticated",Authenticated)

     return Authenticated;
    }


}

export default new Auth();