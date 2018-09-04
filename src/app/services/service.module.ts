import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileService } from './upload-file/upload-file.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService
  ],
  declarations: []
})
export class ServiceModule { }
