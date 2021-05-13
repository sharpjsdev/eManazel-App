import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertTokenPage } from './insert-token.page';

describe('InsertTokenPage', () => {
  let component: InsertTokenPage;
  let fixture: ComponentFixture<InsertTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
