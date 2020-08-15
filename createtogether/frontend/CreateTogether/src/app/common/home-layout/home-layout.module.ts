import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { AppRightNavComponent } from './app-right-nav/app-right-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { UpdateProfileModalComponent } from './update-profile-modal/update-profile-modal.component';
import { UserProfileService } from './services/user.profile.service';
import { UserProfileApiService } from './services/user.profile.api.service';
import { ProfileDataService } from './services/profile.data.service';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [LayoutComponent, AppToolbarComponent, AppRightNavComponent, AppFooterComponent, UpdateProfileModalComponent, ChangePasswordModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [UpdateProfileModalComponent, ChangePasswordModalComponent],
  providers: [UserProfileService, UserProfileApiService, ProfileDataService]
})
export class HomeLayoutModule { }
