import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

import { ContactService } from '../contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  
  formAdd : FormGroup;
  public successAlert: boolean = false;

  public contactid: number;
  public detailContact: any;

  constructor(private contactService: ContactService, private fb: FormBuilder, private route: ActivatedRoute,) {

    this.resetForm();

    this.route.params.subscribe(params => {
      console.log("abc", params.id);
      this.contactid = params.id;
      if(this.contactid){
        this.contactService.getContactById(this.contactid).subscribe((data)=>{
          let result = data;
          this.detailContact = result['result'];
          console.log("A", this.detailContact);
          
          this.editForm();
        })
      }
    })
  }

  ngOnInit() {
    this.resetForm();
  }

  submitForm(value:any){
    console.log(this.formAdd.value);
    
    this.contactService.createContact(this.formAdd.value).subscribe((data)=>{
      let result = data;
      console.log(result['result']);
      this.successAlert = true;
      this.resetForm();
    }, (err: HttpErrorResponse) => {
      console.log(err)
    })
  }

  resetForm(){
    this.formAdd = this.fb.group({
      'id' : ['', Validators.required],
      'name' : ['', Validators.required],
      'address' : ['', Validators.required],
      'email' : ['', 
        [ Validators.required, Validators.pattern(EMAIL_REGEX)] 
      ],
      'phone' : ['', Validators.required],
      'picture' : ['', Validators.required],
      'version' : ['', Validators.required]
    })
  }

  editForm(){
    let editValue:any = {};
    editValue.id = this.detailContact.id
    editValue.name = this.detailContact.name;
    editValue.address = this.detailContact.address;
    editValue.email = this.detailContact.email;
    editValue.phone = this.detailContact.phone;
    editValue.picture = this.detailContact.picture;
    editValue.version = this.detailContact.version;

    this.formAdd.setValue(editValue);
  }

}
