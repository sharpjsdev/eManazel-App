import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyCommunityPage } from './apply-community.page';

describe('ApplyCommunityPage', () => {
  let component: ApplyCommunityPage;
  let fixture: ComponentFixture<ApplyCommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCommunityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
