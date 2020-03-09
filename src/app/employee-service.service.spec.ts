import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee-service.service';
import { Employee } from './employee';
import { Http } from '@angular/http';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let http: Http;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService, Http]
    });
    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // afterEach(() => {
  //   httpMock.verify();
  // });

  // it('should retrieve posts from the API via GET', () => {
  //     const dummyPosts: Employee[] = [
  //       { name: 'Bob', dependents: ['Amber', 'Bill', 'Dan']},
  //       { name: 'Fred', dependents: ['Kate']}
  //     ]
  //     service.getEmployees().subscribe(posts => {
  //       expect(posts.length).toBe(2);
  //       expect(posts).toEqual(dummyPosts);
  //     });
  //     const request = httpMock.expectOne('${service.url}/employees');
  //     expect(request.request.method).toBe('GET');
  //     request.flush(dummyPosts); 
  //   }
  // );
});
