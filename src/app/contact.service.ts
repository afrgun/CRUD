import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class ContactService{
    public url: string;
    public contactList: any;

    constructor(private http:HttpClient){
        this.url = environment.apiUrl;
    }

    getContact(){
        const url = `${this.url}/api/v1/person`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(url, {headers: headers}).pipe(
            tap(res => {
                console.log(res);
                this.contactList = res['results'];
            })
        )
    }

    getContactById(id:number){
        const url = `${this.url}/api/v1/person/${id}`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
      
        return this.http.get(url, {headers: headers}).pipe(
            tap(res => {
            console.log("aa", res);
            this.contactList = res['results'];

          }));
    }

    createContact(data:any){
        const url = `${this.url}/api/v1/person/`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, data, {headers: headers}).pipe(
            tap(res => {
                console.log(res);
                this.contactList = res['results'];
            })
        )
    }

    updateContact(data:any, id:number){
        const url = `${this.url}/api/v1/person/${id}`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.put(url, data, {headers: headers}).pipe(
            tap(res => {
                console.log(res);
                this.contactList = res['results'];
            })
        )
    }

    deleteContact(id:number){
        const url = `${this.url}/api/v1/person/${id}`;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.delete(url, {headers: headers}).pipe(
            tap(res => {
                console.log(res);
                this.contactList = res['results'];
            })
        )
    }
}