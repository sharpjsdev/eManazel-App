import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDocumentPage } from './edit-document.page';

describe('EditDocumentPage', () => {
  let component: EditDocumentPage;
  let fixture: ComponentFixture<EditDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
