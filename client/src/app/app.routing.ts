import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
const appRoutes : Routes = [
    { path : '', children : [
        { path : '', component : LoginComponent},
        
        { path : 'home', component : HomeComponent},
        { path : 'login', component : LoginComponent},
        { path : 'signup', component : SignupComponent},
        { path : 'forgotpassword', component : ForgotpasswordComponent}

    ] }
    
]









@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})

export class AppRoutingModule {}