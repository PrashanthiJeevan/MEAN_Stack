import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _cookie:CookieService) { }

  ngOnInit() {
  }
  logout_it(){
this._cookie.set('token',"");
this._cookie.set('userdetails',"");
  }
}
