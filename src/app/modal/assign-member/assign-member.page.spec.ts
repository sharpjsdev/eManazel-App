import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignMemberPage } from './assign-member.page';

describe('AssignMemberPage', () => {
  let component: AssignMemberPage;
  let fixture: ComponentFixture<AssignMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
