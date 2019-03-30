import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SinInComponent } from './sin-in/sin-in.component';
// import { MainfilterPipe } from './mainfilter.pipe';
import { UiSwitchModule } from 'ngx-toggle-switch';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule.forRoot([
      {
        path:'login',
        component:SinInComponent,
      }
    ]),
    AppRoutingModule,
    UiSwitchModule,
    NgxWebstorageModule.forRoot()
  ],
  
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SinInComponent,
  
    // MainfilterPipe,
  
    // FilterformatPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
