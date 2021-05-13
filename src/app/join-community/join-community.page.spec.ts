import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinCommunityPage } from './join-community.page';

describe('JoinCommunityPage', () => {
  let component: JoinCommunityPage;
  let fixture: ComponentFixture<JoinCommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinCommunityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
