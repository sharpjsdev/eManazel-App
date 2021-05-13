import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminContractPage } from './admin-contract.page';

describe('AdminContractPage', () => {
  let component: AdminContractPage;
  let fixture: ComponentFixture<AdminContractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContractPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminContractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
