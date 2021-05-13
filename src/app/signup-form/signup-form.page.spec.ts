import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupFormPage } from './signup-form.page';

describe('SignupFormPage', () => {
  let component: SignupFormPage;
  let fixture: ComponentFixture<SignupFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
