import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any={
    name:"",
    password:""
  };
  responce:any;
  constructor(private _Auth:AuthService) { }

  ngOnInit() {
  }
login_details(){
this._Auth.login_check(this.login);

}
}
