import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { Employee } from '../employee';
import { MatTable } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';

const costs = {
  employee: {
    PerYear: 1000,
    PerPaycheck: 1000/26
  },
  dependent: {
    PerYear: 500,
    PerPaycheck: 500/26
  }
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})

export class EmployeeComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private employeeService: EmployeeService) {}
  employeeName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  employees: Employee[];
  dependents = [];
  totalCosts = {
    year: 0,
    paycheck: 0
  };
  displayedColumns: string[] = ['Employee', 'Dependents', 'Paycheck', 'Yearly', 'Delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  getErrorMessage(name) {
    if (name.hasError('required')) {
      return 'You must enter a value';
    } 
    return name.hasError('pattern') ? 'Enter a valid name' : '';
  }

  deleteEmployee(id:any) {
    let employees = this.employees;
    this.employeeService.deleteEmployee(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < employees.length; i++) {
          if (employees[i]._id == id) {
            this.totalCosts.paycheck -= employees[i].costPaycheck;
            this.totalCosts.year -= employees[i].costYear;
            employees.splice(i,1);
            this.table.renderRows();
          }
        } 
      }
    });
  }

  clearEntries() {
    this.employeeName.reset();
    this.dependents = [];
  }
  
  addEmployee() {
    let name = this.employeeName.value;
    let dependents = [];
    let totalCostsPaycheck = this.calculateCosts().paycheck;
    let totalCostsYear = this.calculateCosts().year;
    for (let dependent of this.dependents) { 
      dependents.push(dependent.value);
    }
    const newEmployee = { 
      name: name,
      dependents: dependents,
      costPaycheck: totalCostsPaycheck,
      costYear: totalCostsYear
    }
    this.employeeService.addEmployee(newEmployee).subscribe(employee => {
      this.employees.push(employee);
      this.table.renderRows();
    });
    this.totalCosts.paycheck += totalCostsPaycheck;
    this.totalCosts.year += totalCostsYear;
    this.clearEntries();
    this.table.renderRows();
  }

  addDependent() {
    this.dependents.push({value: ""});
  }

  removeDependent(index) {
    this.dependents.splice(index,1);
  }

  applyDiscount(costType) {
    return {year: costType.PerYear * 0.90, paycheck: costType.PerPaycheck * 0.90};
  }

  calculateCosts() {
    let employee = this.employeeName.value;
    let dependents = this.dependents;
    let cost = {
      year: 0,
      paycheck: 0
    }
    if (employee != "" && employee.charAt(0) == 'A') {
      cost.year += this.applyDiscount(costs.employee).year;
      cost.paycheck += this.applyDiscount(costs.employee).paycheck;
    } else {
      cost.year += costs.employee.PerYear;
      cost.paycheck += costs.employee.PerPaycheck;
    }
    if (dependents.length != 0) {
      for (let dependent of dependents) {
        if (dependent.value.charAt(0) == 'A') {
          cost.year += this.applyDiscount(costs.dependent).year;
          cost.paycheck += this.applyDiscount(costs.dependent).paycheck;
        } else {
          cost.year += costs.dependent.PerYear;
          cost.paycheck += costs.dependent.PerPaycheck;
        }
      }
    }
    return cost;
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees
      for (let employee of employees) {
        this.totalCosts.paycheck += employee.costPaycheck;
        this.totalCosts.year += employee.costYear;
      }
    });
  }
  
}
