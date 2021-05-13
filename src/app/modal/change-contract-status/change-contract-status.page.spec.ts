import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeContractStatusPage } from './change-contract-status.page';

describe('ChangeContractStatusPage', () => {
  let component: ChangeContractStatusPage;
  let fixture: ComponentFixture<ChangeContractStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeContractStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeContractStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
