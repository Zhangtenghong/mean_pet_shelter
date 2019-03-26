import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { 
  }
  getPets(){
    return this._http.get('/api/pets');
  }
  findPet(id){
    return this._http.get('/api/pets/'+id);
  }
  addPet(newPet){
    return this._http.post('/api/pets', newPet);
  }
  editPet(editedPet){
    return this._http.put('/api/pets/'+ editedPet._id, editedPet);
  }
  deletePet(id){
    return this._http.delete('/api/pets/'+id);
  }
  updateLikes(pet){
    return this._http.put('/api/pets/'+ pet._id, pet)
  }
}