import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  singlePet:any;
  id:any;
  liked:boolean;
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.singlePet = {};
    this.liked=true;
    this._route.params.subscribe((params:Params)=>{
      this.id=params
      this.getPet(this.id.id)
    })
  }

  getPet(id) {
    let dataFromService_1=this._httpService.findPet(id);
    console.log("This pet is", id);
    dataFromService_1.subscribe((data) =>{
      this.singlePet=data
      console.log(this.singlePet)
    })
  }

  deletePetFromService(id){
    let dataFromService_3=this._httpService.deletePet(id);
    console.log("Delete the data",id);
    dataFromService_3.subscribe();
    this._router.navigate(['/pets']);
  }

  likeButtonClick(singlePet){
    singlePet.likes+=1;
    let dataFromService_4=this._httpService.updateLikes(singlePet);
    dataFromService_4.subscribe(data =>{
      this.liked=false;
      this._router.navigate(['pets',this.id.id])
    }); 
  }
}
