import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetingAddPage } from './meeting-add.page';

describe('MeetingAddPage', () => {
  let component: MeetingAddPage;
  let fixture: ComponentFixture<MeetingAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
