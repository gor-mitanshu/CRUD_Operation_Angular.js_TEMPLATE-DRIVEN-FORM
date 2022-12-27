import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  updateEmployee: any;
  showAdd!: boolean;
  showUpdate!: boolean;


  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getAllEmployee();
  }


  clickAddEmployee() {
    this.form.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.Firstname = this.form.value.Firstname;
    this.employeeModelObj.Lastname = this.form.value.Lastname;
    this.employeeModelObj.Email = this.form.value.Email;
    this.employeeModelObj.Phone = this.form.value.Phone;
    this.employeeModelObj.Salary = this.form.value.Salary;

    this.api.postEmploye(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Successfully")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.form.reset();
        this.getAllEmployee();
      },
        _err => {
          alert('Something went wrong');
        })
  }


  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }


  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee Deleted");
        this.getAllEmployee();
      })
  }


  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.form.controls['Firstname'].setValue(row.Firstname);
    this.form.controls['Lastname'].setValue(row.Lastname);
    this.form.controls['Email'].setValue(row.Email);
    this.form.controls['Phone'].setValue(row.Phone);
    this.form.controls['Salary'].setValue(row.Salary);
    this.getAllEmployee()
  }
  updateEmployeeDetails() {
    this.employeeModelObj.Firstname = this.form.value.Firstname;
    this.employeeModelObj.Lastname = this.form.value.Lastname;
    this.employeeModelObj.Email = this.form.value.Email;
    this.employeeModelObj.Phone = this.form.value.Phone;
    this.employeeModelObj.Salary = this.form.value.Salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel')
        ref?.click()
        this.form.reset()
        this.getAllEmployee()
      })
  }



}