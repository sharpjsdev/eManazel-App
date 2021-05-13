import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticeAddPage } from './notice-add.page';

describe('NoticeAddPage', () => {
  let component: NoticeAddPage;
  let fixture: ComponentFixture<NoticeAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
