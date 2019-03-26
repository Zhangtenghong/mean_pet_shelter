import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet:any;
  id:any;
  editedPet: any;
  errorMessages: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { 
    this.editPet = {name:"", type:"", description:"", skill_1:"", skill_2:"", skill_3:""}
    this.errorMessages=[];
  }

  ngOnInit() {
    this.editPet = {};
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.id = params;
      this.getPet(this.id.id);
    })
  }

  
  getPet(id) {
    let dataFromService_1=this._httpService.findPet(id);
    console.log("Get the data");
    dataFromService_1.subscribe((data) =>{
      this.editPet=data;
      console.log(this.editPet)
    })
  }

  updatePet(){
    console.log("TESTING")
    let observable2=this._httpService.editPet(this.editPet);
    observable2.subscribe(data =>{
      this.editedPet={name:"", type:"", description:"", skill_1:"", skill_2:"", skill_3:""};
      this._router.navigate(['/pets']);
    },(err)=>{
      this.errorMessages=err.error;  
    })
  }
}
