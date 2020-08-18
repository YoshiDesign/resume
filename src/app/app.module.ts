import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// My service for servicing
import {ResumeService} from './services/ResumeService'
import Skillet from './data/Skillet'

import { AppComponent } from './app.component';
import { SocialViewComponent } from './social-view/social-view.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { BadgeComponentComponent } from './badge-component/badge-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SocialViewComponent,
    ProjectViewComponent,
    BadgeComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      ResumeService,
      Skillet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
