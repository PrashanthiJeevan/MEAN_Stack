import { Component, OnInit } from '@angular/core';
import {AuthService} from'../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _authservie:AuthService,private _router:Router) { }
post_it:any="";
likes:any=[];
products:any="";
user_details:any='';
  ngOnInit() {

    this._authservie.postlist().subscribe((data:any)=>{
      if(data.isLoggedIn==true){
        this.user_details=this._authservie.details_call();
        this.user_details=JSON.parse(this.user_details);
        console.log("LoggedIn To"+this.user_details.name);
        //console.log(this.user_details);
        this.decide_likes(this.user_details.name);
      this.page_start();
      }else{
        this._router.navigate(['login']);
      }
    });
  }
  page_start(){
    this._authservie.getdata().subscribe((data:any)=>{
      this.products=data;

    });
  }

post_submit(){
  if(this.post_it!=''){
this._authservie.post_details(this.user_details.name,this.post_it).subscribe((data:any)=>{
  if(data.value==true){
    this.page_start();
  }else{
    console.log(false);
  }
});
}}
del(val:any){

this._authservie.del_post(val).subscribe((data:any)=>{
  if(data.value==true){
    this.page_start();
  }else{
    console.log(false);
  }
});
}
goto(x:any){
  this._authservie.product_info=x;
  this._router.navigate(['product']);
}

change_like(e,post){
  if(e.target.classList.value=="fa fa-thumbs-o-up"){
    e.target.classList.value="fa fa-thumbs-up";
    var temp={
      username:this.user_details.name,
      post:post,
      liked:true
    }
  }
  else{
    var temp={
      username:this.user_details.name,
      post:post,
      liked:false
    }
    e.target.classList.value="fa fa-thumbs-o-up";
  }
  
  this._authservie.like_it(temp).subscribe((data:any)=>{
    console.log(data);
    this.decide_likes(this.user_details.name);
  });
}
decide_likes(temp){
  this._authservie.like_show(temp).subscribe((data)=>{
    this.likes=data;
    console.log(this.likes,"likes");
  });
}
count:any=0;
delete_likes(event){
  this.count=this.count+1;
  return this.count;
}
}
