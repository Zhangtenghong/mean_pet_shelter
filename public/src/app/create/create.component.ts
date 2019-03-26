import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPet: any;
  errorMessages:any;
  constructor(
    private _httpService: HttpService, 
    private _router: Router){
    this.newPet={name:"", type:"", description:"", skill_1:"", skill_2:"", skill_3:""}
    this.errorMessages=[];
  }

 ngOnInit() {
 }

 createPet(){
  let observable_1=this._httpService.addPet(this.newPet);  observable_1.subscribe(data =>{
  console.log("Got data from post back", data);
  this._router.navigate(['/pets']);
  },(err)=>{
    this.errorMessages=err.error;
  })
 }
}