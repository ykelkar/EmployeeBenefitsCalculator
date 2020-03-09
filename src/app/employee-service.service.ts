import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: Http) { }
  url = 'http://localhost:3000/api/';
  //retreiving employees 
  getEmployees() {
    return this.http.get(this.url+'employees').pipe(map(res => res.json()));
  }

  //add employee 
  addEmployee(newEmployee) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+'/employee', newEmployee, {headers: headers}).pipe(map(res => res.json()));
  }

  deleteEmployee(id) {
    return this.http.delete(this.url+'/employee/'+id).pipe(map(res => res.json()));
  }

}
