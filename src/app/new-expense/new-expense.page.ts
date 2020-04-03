import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ExpenseService } from '../services/expense.service';
import { PhotoService } from '../services/photo.service';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {
  public expenseForm: FormGroup;
  public photo: Photo;
  constructor( private expenseService: ExpenseService,
               public photoService: PhotoService,
               public formBuilder: FormBuilder,
               private router: Router ) {
              this.expenseForm = formBuilder.group({
                  id: [this.expenseService.expenses.length + 1],
                  type: ['', Validators.required],
                  description: ['', Validators.required],
                  cost: ['', Validators.required],
                  receipt_filepath: ['', Validators.required]
              });
                 
                }

  ngOnInit() {
  }

  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value)
    this.router.navigateByUrl('/tabs/viewExpenses');   
  }

  takePhoto() {
    this.photoService.addNewToGallery(this.expenseForm.controls['id'].value).then((image) => 
    {
      this.expenseForm.controls['receipt_filepath'].patchValue(image.filepath),
      this.photo = image;
    }
  )}
}