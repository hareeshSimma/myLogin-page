import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken : any;
  user : any;
   url:string;
  constructor(private http : Http) { }



getService() {
    let headers = new Headers();
    console.log(this.url);
    headers.append('Content-Type', 'application/json');
     return this.http.get(this.url, { headers : headers})
      .map(res => res.json());
  }


  postService(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.url, user, { headers : headers})
      .map(res => res.json());
  }
  
  storeUserData(token, user) {
    sessionStorage.setItem('id_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


// sendMail(user) {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//      return this.http.post('http://localhost:3000/users/forgotpassword', user, { headers : headers})
//       .map(res => res.json());
//   }


  // setPassword(user){

  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/users/setPassword', user, { headers : headers})
  //     .map(res => res.json());
  // }

}
