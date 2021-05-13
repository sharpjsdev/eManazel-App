import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResidentEditPage } from './resident-edit.page';

describe('ResidentEditPage', () => {
  let component: ResidentEditPage;
  let fixture: ComponentFixture<ResidentEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
