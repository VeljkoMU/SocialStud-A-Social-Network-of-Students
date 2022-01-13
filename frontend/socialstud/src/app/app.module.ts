import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { InterestsComponent } from './components/interests/interests.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileThumbnailComponent } from './components/profile-thumbnail/profile-thumbnail.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SearchComponent } from './components/search/search.component';
import { RequestComponent } from './components/request/request.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    MainComponent,
    InterestsComponent,
    ProfileViewComponent,
    ProfileThumbnailComponent,
    RecommendationsComponent,
    SearchComponent,
    RequestComponent,
    RequestListComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
