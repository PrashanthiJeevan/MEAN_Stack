import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from'@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _authservie:AuthService,private _router:Router) { }
product_info:any={username:'',post:''};
  ngOnInit() {
    this._authservie.postlist().subscribe((data:any)=>{
      if(data.isLoggedIn==true){
        try{
          this.product_info=this._authservie.single_product();
          if(this.product_info==undefined){
            this._router.navigate(['products']);
          }
          this.show_comment();
        }
        catch(err){
          this._router.navigate(['products']);
        }
       
      }else{
        this._router.navigate(['login']);
      }
    });
  }
  show_a_comment:any=[];
  save_comment:any='';
  show_comment(){
    var temp={
      post:this.product_info.post
    }
    this._authservie.show_comment(temp).subscribe((data:any)=>{
     
      this.show_a_comment= data;
    })
  }
  enter_comment(){
   if(this.save_comment!=''){
     var temp={
       username:this.product_info.username,
       post:this.product_info.post,
       comment:this.save_comment
     }
     console.log(temp);
     this._authservie.save_comment(temp).subscribe((data:any)=>{
       this.show_comment();
     });
   }
   
  }
  del_cmd(temp:any){
    this._authservie.del_comment(temp).subscribe((data:any)=>{
      this.show_comment();
    });
  }
}
