import { routes } from './../../app.routes';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // loginObj: any = {
  //   "EmailId": "",
  //   "Password": ""
  // }

  loginObj: any = {
    EmailId: "",
    Password: ""
  }

  http = inject(HttpClient);
  routes = inject(Router);

  onLogin(){
    // this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginObj).subscribe((res:any)=>{
    //   if(res.result){
    //     alert("Login Susses");
    //     localStorage.setItem('angularToken', res.data.token);
    //     this.routes.navigateByUrl('app');
    //   }else {
    //     alert(res.message);
    //   }
    // });
    if(this.loginObj.EmailId == "zds@gmail.com" && this.loginObj.Password == "1234"){
      this.routes.navigateByUrl('app');
    }else {
      alert("Invaid Password");
    }
  }

}
