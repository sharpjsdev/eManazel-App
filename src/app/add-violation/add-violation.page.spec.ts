import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddViolationPage } from './add-violation.page';

describe('AddViolationPage', () => {
  let component: AddViolationPage;
  let fixture: ComponentFixture<AddViolationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViolationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddViolationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
