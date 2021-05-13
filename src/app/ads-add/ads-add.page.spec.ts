import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdsAddPage } from './ads-add.page';

describe('AdsAddPage', () => {
  let component: AdsAddPage;
  let fixture: ComponentFixture<AdsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
