import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileService } from './upload-file/upload-file.service';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  HospitalService,
  DoctorService,
  LoginGuardGuard,
  AdminGuard,
  CheckTokenGuard
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
    HospitalService,
    DoctorService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    AdminGuard,
    CheckTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
