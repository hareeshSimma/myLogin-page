import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : String;
  password : String;

  constructor(private authService : AuthService,
  private router : Router,
  private flashMessage : FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username : this.username,
      password : this.password
    }
    this.authService.url="http://localhost:3000/users/authenticate";
    this.authService.postService(user).subscribe(data => {
      if(data.success) {
        console.log(data);
      this.authService.storeUserData(data.token, data.user);
      this.flashMessage.show('Login Successfully', { 
        cssClass : 'alert-success', 
        timeOut : 9000 
      })
      this.router.navigate(['/home']);
      }else {
      this.flashMessage.show(data.msg, { 
        cssClass : 'alert-danger', 
        timeOut : 9000 
      })
      this.router.navigate(['/login']);
      }
    })






    
  }



}
