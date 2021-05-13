import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNoticePage } from './edit-notice.page';

describe('EditNoticePage', () => {
  let component: EditNoticePage;
  let fixture: ComponentFixture<EditNoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoticePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
