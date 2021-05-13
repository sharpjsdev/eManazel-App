import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBankPage } from './edit-bank.page';

describe('EditBankPage', () => {
  let component: EditBankPage;
  let fixture: ComponentFixture<EditBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
