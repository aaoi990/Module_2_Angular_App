import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailExpensePage } from './detail-expense.page';

describe('DetailExpensePage', () => {
  let component: DetailExpensePage;
  let fixture: ComponentFixture<DetailExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
