import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ExpenseService } from '../services/expense.service';
import { PhotoService } from '../services/photo.service';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-detail-expense',
  templateUrl: './detail-expense.page.html',
  styleUrls: ['./detail-expense.page.scss'],
})
export class DetailExpensePage implements OnInit {
  public photo: Photo;
  
  expense = this.expenseService.selectedExpense;

  constructor( private expenseService: ExpenseService,
    private photoService: PhotoService,
    public alertController: AlertController,
    private router: Router ) { }

  ngOnInit() {    
    this.photo = this.photoService.photos.find(obj => {
      return obj.filepath === this.expense.receipt_filepath
    })
  }

  delete() {
    this.confirm()
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Okay',
          handler: () => {
            this.expenseService.deleteExpense(this.expense)
              .then(() => {
                this.photoService.delete(this.expense.receipt_filepath);
              })
            this.router.navigateByUrl('/');
          }
        }
      ]
    });

    await alert.present();
  }


}
