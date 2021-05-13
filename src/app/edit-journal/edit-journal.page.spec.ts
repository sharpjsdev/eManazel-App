import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditJournalPage } from './edit-journal.page';

describe('EditJournalPage', () => {
  let component: EditJournalPage;
  let fixture: ComponentFixture<EditJournalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJournalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditJournalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
