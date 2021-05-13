import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyCommunityMemeberPage } from './apply-community-memeber.page';

describe('ApplyCommunityMemeberPage', () => {
  let component: ApplyCommunityMemeberPage;
  let fixture: ComponentFixture<ApplyCommunityMemeberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCommunityMemeberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyCommunityMemeberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
