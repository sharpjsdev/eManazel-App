import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemsConditionsPage } from './tems-conditions.page';

describe('TemsConditionsPage', () => {
  let component: TemsConditionsPage;
  let fixture: ComponentFixture<TemsConditionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemsConditionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemsConditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
