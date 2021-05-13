import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuildingDetailPage } from './building-detail.page';

describe('BuildingDetailPage', () => {
  let component: BuildingDetailPage;
  let fixture: ComponentFixture<BuildingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
