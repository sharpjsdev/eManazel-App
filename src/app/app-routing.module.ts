import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './services/auth.service'; 
const routes: Routes = [
  {
    path: 'root',
    redirectTo: 'root',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'root',
    loadChildren: () => import('./root/root.module').then( m => m.RootPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'signup-form/:id',
    loadChildren: () => import('./signup-form/signup-form.module').then( m => m.SignupFormPageModule)
  },
  {
    path: 'tems-conditions',
    loadChildren: () => import('./tems-conditions/tems-conditions.module').then( m => m.TemsConditionsPageModule)
  },
  {
    path: 'login-form/:id',
    loadChildren: () => import('./login-form/login-form.module').then( m => m.LoginFormPageModule,), canActivate : [AuthService] 
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'emergency-contact',
    loadChildren: () => import('./emergency-contact/emergency-contact.module').then( m => m.EmergencyContactPageModule)
  },
  {
    path: 'building-service',
    loadChildren: () => import('./building-service/building-service.module').then( m => m.BuildingServicePageModule)
  },
  {
    path: 'notice-list',
    loadChildren: () => import('./notice-list/notice-list.module').then( m => m.NoticeListPageModule)
  },
  {
    path: 'meeting-list',
    loadChildren: () => import('./meeting-list/meeting-list.module').then( m => m.MeetingListPageModule)
  },
  {
    path: 'community-details',
    loadChildren: () => import('./community-details/community-details.module').then( m => m.CommunityDetailsPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'my-events',
    loadChildren: () => import('./my-events/my-events.module').then( m => m.MyEventsPageModule)
  },
  {
    path: 'my-ads',
    loadChildren: () => import('./my-ads/my-ads.module').then( m => m.MyAdsPageModule)
  },
  {
    path: 'notice-detail/:id',
    loadChildren: () => import('./notice-detail/notice-detail.module').then( m => m.NoticeDetailPageModule)
  },
  {
    path: 'notice-add',
    loadChildren: () => import('./notice-add/notice-add.module').then( m => m.NoticeAddPageModule)
  },
  {
    path: 'edit-notice/:id',
    loadChildren: () => import('./edit-notice/edit-notice.module').then( m => m.EditNoticePageModule)
  },
  {
    path: 'maintenance-list',
    loadChildren: () => import('./maintenance-list/maintenance-list.module').then( m => m.MaintenanceListPageModule)
  },
  {
    path: 'maintenance-add',
    loadChildren: () => import('./maintenance-add/maintenance-add.module').then( m => m.MaintenanceAddPageModule)
  },
  {
    path: 'maintenance-detail/:id',
    loadChildren: () => import('./maintenance-detail/maintenance-detail.module').then( m => m.MaintenanceDetailPageModule)
  },
  {
    path: 'ads',
    loadChildren: () => import('./ads/ads.module').then( m => m.AdsPageModule)
  },
  {
    path: 'ads-details/:id',
    loadChildren: () => import('./ads-details/ads-details.module').then( m => m.AdsDetailsPageModule)
  },
  {
    path: 'phone-book',
    loadChildren: () => import('./phone-book/phone-book.module').then( m => m.PhoneBookPageModule)
  },
  {
    path: 'visitor-list',
    loadChildren: () => import('./visitor-list/visitor-list.module').then( m => m.VisitorListPageModule)
  },
  {
    path: 'visitor-add',
    loadChildren: () => import('./visitor-add/visitor-add.module').then( m => m.VisitorAddPageModule)
  },
  {
    path: 'visitor-detail/:id',
    loadChildren: () => import('./visitor-detail/visitor-detail.module').then( m => m.VisitorDetailPageModule)
  },
  {
    path: 'complaint',
    loadChildren: () => import('./complaint/complaint.module').then( m => m.ComplaintPageModule)
  },
  {
    path: 'complaint-add',
    loadChildren: () => import('./complaint-add/complaint-add.module').then( m => m.ComplaintAddPageModule)
  },
  {
    path: 'complaint-detail/:id',
    loadChildren: () => import('./complaint-detail/complaint-detail.module').then( m => m.ComplaintDetailPageModule)
  },
  {
    path: 'event-add',
    loadChildren: () => import('./event-add/event-add.module').then( m => m.EventAddPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'event-edit/:id',
    loadChildren: () => import('./event-edit/event-edit.module').then( m => m.EventEditPageModule)
  },
  {
    path: 'ads-add',
    loadChildren: () => import('./ads-add/ads-add.module').then( m => m.AdsAddPageModule)
  },
  {
    path: 'ads-detail/:id',
    loadChildren: () => import('./ads-detail/ads-detail.module').then( m => m.AdsDetailPageModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./bills/bills.module').then( m => m.BillsPageModule)
  },
  {
    path: 'my-details',
    loadChildren: () => import('./my-details/my-details.module').then( m => m.MyDetailsPageModule)
  },
  {
    path: 'add-vehicle',
    loadChildren: () => import('./add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
  },
  {
    path: 'edit-vehicle/:id',
    loadChildren: () => import('./edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
  },
  {
    path: 'building-add',
    loadChildren: () => import('./building-add/building-add.module').then( m => m.BuildingAddPageModule)
  },
  {
    path: 'building-detail/:id',
    loadChildren: () => import('./building-detail/building-detail.module').then( m => m.BuildingDetailPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./popover/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'join-community',
    loadChildren: () => import('./join-community/join-community.module').then( m => m.JoinCommunityPageModule)
  },
  {
    path: 'menu-header',
    loadChildren: () => import('./menu-header/menu-header.module').then( m => m.MenuHeaderPageModule)
  },
  {
    path: 'document',
    loadChildren: () => import('./document/document.module').then( m => m.DocumentPageModule)
  },
  {
    path: 'document-detail/:id',
    loadChildren: () => import('./document-detail/document-detail.module').then( m => m.DocumentDetailPageModule)
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then( m => m.BankPageModule)
  },
  {
    path: 'unit-list',
    loadChildren: () => import('./unit-list/unit-list.module').then( m => m.UnitListPageModule)
  },
  {
    path: 'notification-list',
    loadChildren: () => import('./notification-list/notification-list.module').then( m => m.NotificationListPageModule)
  },
  {
    path: 're-issue-visitor',
    loadChildren: () => import('./modal/re-issue-visitor/re-issue-visitor.module').then( m => m.ReIssueVisitorPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'violation-list',
    loadChildren: () => import('./violation-list/violation-list.module').then( m => m.ViolationListPageModule)
  },
  {
    path: 'violation-detail/:id',
    loadChildren: () => import('./violation-detail/violation-detail.module').then( m => m.ViolationDetailPageModule)
  },
  {
    path: 'external-request-list',
    loadChildren: () => import('./external-request-list/external-request-list.module').then( m => m.ExternalRequestListPageModule)
  },
  {
    path: 'external-request-detail/:id',
    loadChildren: () => import('./external-request-detail/external-request-detail.module').then( m => m.ExternalRequestDetailPageModule)
  },
  {
    path: 'change-request-status',
    loadChildren: () => import('./modal/change-request-status/change-request-status.module').then( m => m.ChangeRequestStatusPageModule)
  },
  {
    path: 'insert-token',
    loadChildren: () => import('./modal/insert-token/insert-token.module').then( m => m.InsertTokenPageModule)
  },
  {
    path: 'item-list',
    loadChildren: () => import('./item-list/item-list.module').then( m => m.ItemListPageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'item-detail/:id',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./contracts/contracts.module').then( m => m.ContractsPageModule)
  },
  {
    path: 'service-provider-user',
    loadChildren: () => import('./service-provider-user/service-provider-user.module').then( m => m.ServiceProviderUserPageModule)
  },
  {
    path: 'service-provider-agreement',
    loadChildren: () => import('./service-provider-agreement/service-provider-agreement.module').then( m => m.ServiceProviderAgreementPageModule)
  },
  {
    path: 'contract-add',
    loadChildren: () => import('./contract-add/contract-add.module').then( m => m.ContractAddPageModule)
  },
  {
    path: 'contract-detail/:id',
    loadChildren: () => import('./contract-detail/contract-detail.module').then( m => m.ContractDetailPageModule)
  },
  {
    path: 'change-contract-status',
    loadChildren: () => import('./modal/change-contract-status/change-contract-status.module').then( m => m.ChangeContractStatusPageModule)
  },
  {
    path: 'complete-job',
    loadChildren: () => import('./modal/complete-job/complete-job.module').then( m => m.CompleteJobPageModule)
  },
  {
    path: 'agreemets',
    loadChildren: () => import('./agreemets/agreemets.module').then( m => m.AgreemetsPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'assign-staff',
    loadChildren: () => import('./modal/assign-staff/assign-staff.module').then( m => m.AssignStaffPageModule)
  },
  {
    path: 'test-add-more',
    loadChildren: () => import('./test-add-more/test-add-more.module').then( m => m.TestAddMorePageModule)
  },
  {
    path: 'add-external-request',
    loadChildren: () => import('./add-external-request/add-external-request.module').then( m => m.AddExternalRequestPageModule)
  },
  {
    path: 'change-staff-status',
    loadChildren: () => import('./modal/change-staff-status/change-staff-status.module').then( m => m.ChangeStaffStatusPageModule)
  },
  {
    path: 'insert-maintain-token',
    loadChildren: () => import('./modal/insert-maintain-token/insert-maintain-token.module').then( m => m.InsertMaintainTokenPageModule)
  },
  {
    path: 'staffs',
    loadChildren: () => import('./staffs/staffs.module').then( m => m.StaffsPageModule)
  },
  {
    path: 'panic-alerts',
    loadChildren: () => import('./panic-alerts/panic-alerts.module').then( m => m.PanicAlertsPageModule)
  },
  {
    path: 'staff-detail/:id',
    loadChildren: () => import('./staff-detail/staff-detail.module').then( m => m.StaffDetailPageModule)
  },
  {
    path: 'add-staff',
    loadChildren: () => import('./add-staff/add-staff.module').then( m => m.AddStaffPageModule)
  },
  {
    path: 'shared-password-match',
    loadChildren: () => import('./shared-password-match/shared-password-match.module').then( m => m.SharedPasswordMatchPageModule)
  },
  {
    path: 'change-job-status',
    loadChildren: () => import('./modal/change-job-status/change-job-status.module').then( m => m.ChangeJobStatusPageModule)
  },
  {
    path: 'change-maintenance-request-status',
    loadChildren: () => import('./modal/change-maintenance-request-status/change-maintenance-request-status.module').then( m => m.ChangeMaintenanceRequestStatusPageModule)
  },
  {
    path: 'service-provider-bill',
    loadChildren: () => import('./service-provider-bill/service-provider-bill.module').then( m => m.ServiceProviderBillPageModule)
  },
  {
    path: 'complaint-reject',
    loadChildren: () => import('./modal/complaint-reject/complaint-reject.module').then( m => m.ComplaintRejectPageModule)
  },
  {
    path: 'meeting-add',
    loadChildren: () => import('./meeting-add/meeting-add.module').then( m => m.MeetingAddPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'add-action/:id',
    loadChildren: () => import('./add-action/add-action.module').then( m => m.AddActionPageModule)
  },
  {
    path: 'journal-details/:id',
    loadChildren: () => import('./journal-details/journal-details.module').then( m => m.JournalDetailsPageModule)
  },
  {
    path: 'edit-journal/:id',
    loadChildren: () => import('./edit-journal/edit-journal.module').then( m => m.EditJournalPageModule)
  },
  {
    path: 'add-emergency-contact',
    loadChildren: () => import('./add-emergency-contact/add-emergency-contact.module').then( m => m.AddEmergencyContactPageModule)
  },
  {
    path: 'add-bank',
    loadChildren: () => import('./add-bank/add-bank.module').then( m => m.AddBankPageModule)
  },
  {
    path: 'edit-bank/:id',
    loadChildren: () => import('./edit-bank/edit-bank.module').then( m => m.EditBankPageModule)
  },
  {
    path: 'edit-emergency-contact/:id',
    loadChildren: () => import('./edit-emergency-contact/edit-emergency-contact.module').then( m => m.EditEmergencyContactPageModule)
  },
  {
    path: 'sos-list',
    loadChildren: () => import('./sos-list/sos-list.module').then( m => m.SosListPageModule)
  },
  {
    path: 'edit-community',
    loadChildren: () => import('./edit-community/edit-community.module').then( m => m.EditCommunityPageModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then( m => m.DepartmentPageModule)
  },
  {
    path: 'add-department',
    loadChildren: () => import('./add-department/add-department.module').then( m => m.AddDepartmentPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'add-service',
    loadChildren: () => import('./add-service/add-service.module').then( m => m.AddServicePageModule)
  },
  {
    path: 'resident-list',
    loadChildren: () => import('./resident-list/resident-list.module').then( m => m.ResidentListPageModule)
  },
  {
    path: 'resident-add',
    loadChildren: () => import('./resident-add/resident-add.module').then( m => m.ResidentAddPageModule)
  },
  {
    path: 'resident-edit/:id',
    loadChildren: () => import('./resident-edit/resident-edit.module').then( m => m.ResidentEditPageModule)
  },
  {
    path: 'resident-details/:id',
    loadChildren: () => import('./resident-details/resident-details.module').then( m => m.ResidentDetailsPageModule)
  },
  {
    path: 'assign-flat',
    loadChildren: () => import('./modal/assign-flat/assign-flat.module').then( m => m.AssignFlatPageModule)
  },
  {
    path: 'group-list',
    loadChildren: () => import('./group-list/group-list.module').then( m => m.GroupListPageModule)
  },
  {
    path: 'group-add',
    loadChildren: () => import('./group-add/group-add.module').then( m => m.GroupAddPageModule)
  },
  {
    path: 'flat-list',
    loadChildren: () => import('./flat-list/flat-list.module').then( m => m.FlatListPageModule)
  },
  {
    path: 'add-flat',
    loadChildren: () => import('./add-flat/add-flat.module').then( m => m.AddFlatPageModule)
  },
  {
    path: 'flat-details/:id',
    loadChildren: () => import('./flat-details/flat-details.module').then( m => m.FlatDetailsPageModule)
  },
  {
    path: 'flat-edit/:id',
    loadChildren: () => import('./flat-edit/flat-edit.module').then( m => m.FlatEditPageModule)
  },
  {
    path: 'assign-member',
    loadChildren: () => import('./modal/assign-member/assign-member.module').then( m => m.AssignMemberPageModule)
  },
  {
    path: 'parking-list',
    loadChildren: () => import('./parking-list/parking-list.module').then( m => m.ParkingListPageModule)
  },
  {
    path: 'add-parking',
    loadChildren: () => import('./add-parking/add-parking.module').then( m => m.AddParkingPageModule)
  },
  {
    path: 'vehicle-list',
    loadChildren: () => import('./vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'service-detail/:id',
    loadChildren: () => import('./service-detail/service-detail.module').then( m => m.ServiceDetailPageModule)
  },
  {
    path: 'service-provider',
    loadChildren: () => import('./service-provider/service-provider.module').then( m => m.ServiceProviderPageModule)
  },
  {
    path: 'add-service-provider',
    loadChildren: () => import('./add-service-provider/add-service-provider.module').then( m => m.AddServiceProviderPageModule)
  },
  {
    path: 'service-provider-details/:id',
    loadChildren: () => import('./service-provider-details/service-provider-details.module').then( m => m.ServiceProviderDetailsPageModule)
  },
  {
    path: 'view-item-list/:id',
    loadChildren: () => import('./view-item-list/view-item-list.module').then( m => m.ViewItemListPageModule)
  },
  {
    path: 'add-document',
    loadChildren: () => import('./add-document/add-document.module').then( m => m.AddDocumentPageModule)
  },
  {
    path: 'edit-document/:id',
    loadChildren: () => import('./edit-document/edit-document.module').then( m => m.EditDocumentPageModule)
  },
  {
    path: 'residents-bill/:id',
    loadChildren: () => import('./residents-bill/residents-bill.module').then( m => m.ResidentsBillPageModule)
  },
  {
    path: 'payment-details/:id',
    loadChildren: () => import('./payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule)
  },
  {
    path: 'add-payment/:id',
    loadChildren: () => import('./add-payment/add-payment.module').then( m => m.AddPaymentPageModule)
  },
  {
    path: 'add-violation',
    loadChildren: () => import('./add-violation/add-violation.module').then( m => m.AddViolationPageModule)
  },
  {
    path: 'invoice-create',
    loadChildren: () => import('./invoice-create/invoice-create.module').then( m => m.InvoiceCreatePageModule)
  },
  {
    path: 'community-dashboard',
    loadChildren: () => import('./community-dashboard/community-dashboard.module').then( m => m.CommunityDashboardPageModule)
  },
  {
    path: 'community-list',
    loadChildren: () => import('./modal/community-list/community-list.module').then( m => m.CommunityListPageModule)
  },
  {
    path: 'event-list',
    loadChildren: () => import('./event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'event-details/:id',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'scan-qr-code-details',
    loadChildren: () => import('./modal/scan-qr-code-details/scan-qr-code-details.module').then( m => m.ScanQrCodeDetailsPageModule)
  },
  {
    path: 'apply-community',
    loadChildren: () => import('./apply-community/apply-community.module').then( m => m.ApplyCommunityPageModule)
  },
  {
    path: 'apply-community-memeber',
    loadChildren: () => import('./apply-community-memeber/apply-community-memeber.module').then( m => m.ApplyCommunityMemeberPageModule)
  },
  {
    path: 'apply-service-provider',
    loadChildren: () => import('./apply-service-provider/apply-service-provider.module').then( m => m.ApplyServiceProviderPageModule)
  },
  {
    path: 'security-sos',
    loadChildren: () => import('./security-sos/security-sos.module').then( m => m.SecuritySosPageModule)
  },
  {
    path: 'show-map',
    loadChildren: () => import('./modal/show-map/show-map.module').then( m => m.ShowMapPageModule)
  },
  {
    path: 'admin-contract',
    loadChildren: () => import('./admin-contract/admin-contract.module').then( m => m.AdminContractPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
