import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name : String;
  username : String;
  email : String;
  password : String;
  constructor(
    private validateService : ValidateService, 
    private flashMessage : FlashMessagesService,
    private authService : AuthService,
    private router : Router
    ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name : this.name,
      username : this.username,
      email : this.email,
      password : this.password
    }
    // Reguired fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('please fill all the fields', { cssClass : 'alert-danger', timeOut : 5000 });
      return false;
    }

    // validate email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Enter a valid Email ID', { cssClass : 'alert-danger', timeOut : 3000 })
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data =>  {
      if(data.success) {
      this.flashMessage.show('Registered Successfully and you can Login now', { cssClass : 'alert-success', timeOut : 3000 })
      this.router.navigate(['/login']);
      }else {
      this.flashMessage.show('Something went wrong, Try again', { cssClass : 'alert-danger', timeOut : 3000 })
      this.router.navigate(['/signup']);
      }
    })
  }

}
