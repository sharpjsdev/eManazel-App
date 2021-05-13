import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanQrCodeDetailsPage } from './scan-qr-code-details.page';

describe('ScanQrCodeDetailsPage', () => {
  let component: ScanQrCodeDetailsPage;
  let fixture: ComponentFixture<ScanQrCodeDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanQrCodeDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanQrCodeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
