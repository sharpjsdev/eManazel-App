import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertMaintainTokenPage } from './insert-maintain-token.page';

describe('InsertMaintainTokenPage', () => {
  let component: InsertMaintainTokenPage;
  let fixture: ComponentFixture<InsertMaintainTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMaintainTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertMaintainTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
