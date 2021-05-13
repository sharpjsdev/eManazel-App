import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunityListPage } from './community-list.page';

describe('CommunityListPage', () => {
  let component: CommunityListPage;
  let fixture: ComponentFixture<CommunityListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
