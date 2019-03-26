import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  allPets: any;
  constructor(private _httpService : HttpService) {
    this.allPets = []
  }

  ngOnInit() {
    this.getPetsFromService();
  }
  getPetsFromService(){
    let dataFromService_1=this._httpService.getPets();
    console.log("Get the data");
    dataFromService_1.subscribe((data) =>{
      this.allPets=data;
      console.log(this.allPets)
    })
  }


}
