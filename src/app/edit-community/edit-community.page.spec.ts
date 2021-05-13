import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCommunityPage } from './edit-community.page';

describe('EditCommunityPage', () => {
  let component: EditCommunityPage;
  let fixture: ComponentFixture<EditCommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommunityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
