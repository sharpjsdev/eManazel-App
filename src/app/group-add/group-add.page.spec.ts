import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupAddPage } from './group-add.page';

describe('GroupAddPage', () => {
  let component: GroupAddPage;
  let fixture: ComponentFixture<GroupAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
