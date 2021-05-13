import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticeListPage } from './notice-list.page';

describe('NoticeListPage', () => {
  let component: NoticeListPage;
  let fixture: ComponentFixture<NoticeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
