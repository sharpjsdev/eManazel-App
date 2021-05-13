import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEmergencyContactPage } from './add-emergency-contact.page';

describe('AddEmergencyContactPage', () => {
  let component: AddEmergencyContactPage;
  let fixture: ComponentFixture<AddEmergencyContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmergencyContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmergencyContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
