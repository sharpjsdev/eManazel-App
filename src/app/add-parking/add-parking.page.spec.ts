import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddParkingPage } from './add-parking.page';

describe('AddParkingPage', () => {
  let component: AddParkingPage;
  let fixture: ComponentFixture<AddParkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParkingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddParkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
