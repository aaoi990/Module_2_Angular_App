import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewExpensePage } from './new-expense.page';

describe('NewExpensePage', () => {
  let component: NewExpensePage;
  let fixture: ComponentFixture<NewExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
