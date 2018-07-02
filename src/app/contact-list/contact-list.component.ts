import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: any;
  public apiUrl: string;
  public contactid: number;

  constructor(public router: Router, private route: ActivatedRoute, private contactService: ContactService) {
    this.apiUrl = this.contactService.url;

    this.route.params.subscribe(params => {
      console.log("aa", params);
      this.contactid = params['id'];
      this.contactService.getContactById(this.contactid).subscribe(()=>{
        this.contacts = this.contactService.contactList;
        console.log("aa", this.contacts);
      });
    })

    this.getContact();
  }

  ngOnInit() {
    this.getContact();
  }

  getContact(){
    this.contactService.getContact().subscribe((data)=>{
      let result = data;
      //console.log("aaa", result);
      this.contacts = result['result'];
    })
  }

  deleteContact(id:number){
    this.contactService.deleteContact(id).subscribe((data)=>{
      let result = data;
      console.log(result['result']);
      this.getContact();
    })
  }

  updateContact(item){
    console.log(item)
    this.router.navigate(['./ContactDetail', item.id]);
  }


  

}
