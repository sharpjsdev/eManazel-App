import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractDetailPage } from './contract-detail.page';

describe('ContractDetailPage', () => {
  let component: ContractDetailPage;
  let fixture: ComponentFixture<ContractDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
