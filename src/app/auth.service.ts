import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private _router:Router,private _HttpClient:HttpClient,private _cookie:CookieService) { }
user_details:any;
  login_check(value:any){
    this._cookie.set('userdetails',JSON.stringify(value));
   this._HttpClient.post('http://localhost:3000/starttoken/'+JSON.stringify(value),value).subscribe((data:any)=>{
   this._cookie.set('token',data.token); 
   console.log(data.text);
   this._router.navigate(['products']);
   });



  }
  postlist(){
    console.log(this._cookie.get('token'),this._cookie.get('userdetails'));
    return this._HttpClient.post('http://localhost:3000/postlist',{text:"true"} ,
    { headers:new HttpHeaders().set('token', this._cookie.get('token'))}
  );
  }
  details_call(){
    return this._cookie.get('userdetails');
  }
getdata(){
  
  return this._HttpClient.get('http://localhost:3000/getposts',{
     headers:new HttpHeaders().set('token', this._cookie.get('token'))
  });
 
}
post_details(user_name:any,post_data:any){
var temp={
  username:user_name,
  post:post_data
}
console.log(temp);
return this._HttpClient.post('http://localhost:3000/submitpost',temp,{
  headers:new HttpHeaders().set('token', this._cookie.get('token'))
});
}
del_post(post:any){
  return this._HttpClient.post('http://localhost:3000/removepost',{post:post},{
    headers:new HttpHeaders().set('token', this._cookie.get('token'))
  });
}
product_info:any;
temp2:any;
single_product(){
  this.temp2= JSON.parse(this._cookie.get('userdetails'));
  console.log(this.temp2);
  var temp={
username:this.temp2.name,
post:this.product_info.post
  }
  console.log(temp);
return temp;
}
show_comment(temp:any){
  return this._HttpClient.post('http://localhost:3000/savecomment/'+"show",temp,{
    headers:new HttpHeaders().set('token', this._cookie.get('token'))
  });
}
save_comment(temp:any){
return this._HttpClient.post('http://localhost:3000/savecomment/'+"add",temp,{
  headers:new HttpHeaders().set('token', this._cookie.get('token'))
});
}
del_comment(temp){
  console.log({post:temp.post,comment:temp.comment});
  return this._HttpClient.post('http://localhost:3000/savecomment/'+"delete",{post:temp.post,comment:temp.comment},{
  headers:new HttpHeaders().set('token', this._cookie.get('token'))
});
}
like_it(temp){
  return this._HttpClient.post('http://localhost:3000/likes/add',temp,{
  headers:new HttpHeaders().set('token', this._cookie.get('token'))
});
}
like_show(temp){
  console.log(temp);
  return this._HttpClient.post('http://localhost:3000/likes/show',temp,{
  headers:new HttpHeaders().set('token', this._cookie.get('token'))
});
}
}
