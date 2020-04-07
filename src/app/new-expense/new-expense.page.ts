import { Component } from '@angular/core';
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
export class NewExpensePage {
  
  public expenseForm: FormGroup;
  public photo: Photo;

  /**
   * Creates an instance of new expense page.
   * Sets the form and validators.
   * @param expenseService 
   * @param photoService 
   * @param formBuilder 
   * @param router 
   */
  constructor( 
    private expenseService: ExpenseService,
    public photoService: PhotoService,
    public formBuilder: FormBuilder,
    private router: Router ) {
      this.expenseForm = formBuilder.group({
        id: [Date.now(), Validators.required],
        type: ['', Validators.required],
        description: ['', Validators.required],
        cost: ['', [Validators.required, Validators.pattern('^[0-9]{0,5}\.[0-9]{0,2}')]],
        receipt_filepath: ['', Validators.required]
      })          
  }

  /**
   * Adds expense to the service instance
   */
  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value)
    this.router.navigateByUrl('/tabs/viewExpenses');   
  }

  /**
   * If navigating away, deletes the photo from the store and navigates 
   * back to home.
   */
  back() {
    if(this.photo) this.photoService.delete(this.photo.filepath);
    this.router.navigateByUrl('/tabs/viewExpenses');   
  }

  /**
   * Takes the photo, add's the serice gallery. Sets this class' photo
   * instance to the photo that's just been taken. 
   */
  takePhoto() {
    this.photoService.addNewToGallery().then((image) => {
      this.expenseForm.controls['receipt_filepath'].patchValue(image.filepath),
      this.photo = image;
    }
  )}
}