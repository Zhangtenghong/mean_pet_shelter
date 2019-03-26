import { PetsComponent } from './pets/pets.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pets',component: PetsComponent },
  { path: 'pets/new', component: CreateComponent },
  { path: 'pets/:id/edit', component: EditComponent },
  { path: 'pets/:id', component: ShowComponent },
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
