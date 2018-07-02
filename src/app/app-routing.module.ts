import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'ContactAdd', component: ContactAddComponent },
  { path: 'ContactDetail/:id', component: ContactDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
