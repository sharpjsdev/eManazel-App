import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBankPage } from './add-bank.page';

describe('AddBankPage', () => {
  let component: AddBankPage;
  let fixture: ComponentFixture<AddBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
