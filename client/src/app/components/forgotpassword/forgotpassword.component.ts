import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private alertMail : AuthService,
  private router : Router,
  private flashMessage : FlashMessagesService) { }

email:String;
otp:String;
newpswd:String;
cpswd:String;

isemail:boolean=true;
isresetpswd:boolean=false;
getMail(){
	

const user = {
      email: this.email
     }
console.log(user)
this.alertMail.url="http://localhost:3000/users/forgotpassword";
 this.alertMail.postService(user).subscribe(data => {

 	console.log(data);


if(data.success) {
        console.log(data);
      // this.authService.storeUserData(data.token, data.user);
      this.flashMessage.show('Otp Send To The Your Mail_id', { 
        cssClass : 'alert-success', 
        timeOut : 9000 
      })
      this.isresetpswd=true;
     this.isemail=false;
      }
      else{
       this.flashMessage.show(data.msg, { 
        cssClass : 'alert-danger', 
        timeOut : 9000 
      })
      }

 })


}


updatepsawd(){
  

const user={
  otp:this.otp,
  newpswd:this.newpswd,
  cpswd:this.cpswd
}
console.log(user)
this.alertMail.url="http://localhost:3000/users/setPassword";
this.alertMail.postService(user).subscribe(data => {

   console.log(data);
   if(data.success) {
this.flashMessage.show('Updated Successfully', { 
        cssClass : 'alert-success', 
        timeOut : 10000 
      })
this.router.navigate(['/login']);

}else{

 this.flashMessage.show(data.msg, { 
        cssClass : 'alert-danger', 
        timeOut : 20000 
      })
 this.isresetpswd=true;
}


 })

}




  ngOnInit() {
  }

}
