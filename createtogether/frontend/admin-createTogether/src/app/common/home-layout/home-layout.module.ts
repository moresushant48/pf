import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { AppLeftNavComponent } from './app-left-nav/app-left-nav.component';
import { AppRightNavComponent } from './app-right-nav/app-right-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserProfileService } from './services/user-profile.service';
import { NgxsModule } from '@ngxs/store';
import { STATES } from './store';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [LayoutComponent, AppToolbarComponent, AppLeftNavComponent, AppRightNavComponent, AppFooterComponent],
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    NgxsModule.forFeature(STATES)
  ],
  providers: [
    UserProfileService
  ]
})
export class HomeLayoutModule { }
