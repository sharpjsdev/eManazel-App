import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteJobPage } from './complete-job.page';

describe('CompleteJobPage', () => {
  let component: CompleteJobPage;
  let fixture: ComponentFixture<CompleteJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
