import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// My service for servicing
import {ResumeService} from './services/ResumeService'
import {PreviewService} from './services/PreviewService'
import URLService from './services/FactoryService'
import Skillet from './repo/Skillet'

import { AppComponent } from './app.component';
import { SocialViewComponent } from './social-view/social-view.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { BadgeComponentComponent } from './badge-component/badge-component.component';
import { TheaterComponentComponent } from './theater-component/theater-component.component';
import { SafePipe } from './Helpers/Helpers';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    SocialViewComponent,
    ProjectViewComponent,
    BadgeComponentComponent,
    TheaterComponentComponent,
    SafePipe,
    IntroComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      ResumeService,
      Skillet,
      PreviewService,
      URLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
