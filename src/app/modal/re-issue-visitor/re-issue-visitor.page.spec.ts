import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReIssueVisitorPage } from './re-issue-visitor.page';

describe('ReIssueVisitorPage', () => {
  let component: ReIssueVisitorPage;
  let fixture: ComponentFixture<ReIssueVisitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReIssueVisitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReIssueVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
