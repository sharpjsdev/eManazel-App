import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractAddPage } from './contract-add.page';

describe('ContractAddPage', () => {
  let component: ContractAddPage;
  let fixture: ComponentFixture<ContractAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
