import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Gallery } from './gallery.page';

describe('Tab2Page', () => {
  let component: Gallery;
  let fixture: ComponentFixture<Gallery>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Gallery],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Gallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
