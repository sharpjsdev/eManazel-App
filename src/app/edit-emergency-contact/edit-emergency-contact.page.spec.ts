import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEmergencyContactPage } from './edit-emergency-contact.page';

describe('EditEmergencyContactPage', () => {
  let component: EditEmergencyContactPage;
  let fixture: ComponentFixture<EditEmergencyContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmergencyContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmergencyContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
