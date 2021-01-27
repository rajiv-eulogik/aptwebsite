import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//  import { HttpClientJsonpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ShareButtonModule } from '@ngx-share/button';
// import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AvatarModule } from 'ngx-avatar';
// import metrials components screen 
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';


import { NgxLoadingModule } from 'ngx-loading';
import * as $ from 'jquery';


// end import metrials components screen 
import { HomeComponent } from './screen/home/home.component';
import { DownloadsComponent } from './screen/downloads/downloads.component';
import { EarnWithUsComponent } from './screen/earn-with-us/earn-with-us.component';
import { SchoolTieUpsComponent } from './screen/school-tie-ups/school-tie-ups.component';
import { ContactUsComponent } from './screen/contact-us/contact-us.component';
import { MainScreenComponent } from './screen/main-screen/main-screen.component';
import { FooterComponent } from './screen/footer/footer.component';
// import { GetDataServiceService} from '../service/get-data-service'
import { from } from 'rxjs';
import { WorkAsCollaboratorComponent } from './screen/work-as-collaborator/work-as-collaborator.component';
import { VideoFacultyComponent } from './screen/video-faculty/video-faculty.component';
import { LanguageTranslatorComponent } from './screen/language-translator/language-translator.component';
import { DubbingArtistComponent } from './screen/dubbing-artist/dubbing-artist.component';
import { EarnHomeComponent } from './screen/earn-home/earn-home.component';
import { AboutUsComponent } from './screen/about-us/about-us.component';
import { DownlodsHomeComponent } from './screen/downloads/downlods-home/downlods-home.component';
import { SubjectsComponent } from './screen/downloads/subjects/subjects.component';
import { TopicsComponent } from './screen/downloads/topics/topics.component';
import { DownloadsAppComponent } from './dialog/downloads-app/downloads-app.component';
import { TopicDetailComponent } from './screen/downloads/topic-detail/topic-detail.component';
import { BlogsComponent } from './screen/blogs/blogs.component';
import { BlogsDetailComponent } from './screen/blogs-detail/blogs-detail.component';
import { BlogsHomeComponent } from './screen/blogs-home/blogs-home.component';
import { CourseHomeComponent } from './screen/course-home/course-home.component';
import { AllCourseComponent } from './screen/course-home/all-course/all-course.component';
import { CourseDetailComponent } from './screen/course-home/course-detail/course-detail.component';
import { BuyCourseComponent } from './screen/course-home/buy-course/buy-course.component';
import { PaymentSuccessComponent } from './screen/course-home/payment-success/payment-success.component';
import { PaymentFaildComponent } from './screen/course-home/payment-faild/payment-faild.component';
import { PaytmGatewayComponent } from './screen/course-home/paytm-gateway/paytm-gateway.component';
import { NotesPaymentsSuccessComponent } from './screen/downloads/notes-payments-success/notes-payments-success.component';
import { NotesPaymentsFaildsComponent } from './screen/downloads/notes-payments-failds/notes-payments-failds.component';
import { SearchDetailComponent } from './screen/search-detail/search-detail.component';
// import animation 
import { CodeExampleService } from './code-example.service';
import { ModalService } from './modal.service';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { ModalComponent } from './modal/modal.component';
import { ToolTipService, ToolTipEvent } from './tool-tip.service';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { AnimationDetailsComponent } from './animation-details/animation-details.component';
import { AnimationCountService } from './animation-count.service';
import { PhotoStreamComponent } from './screen/photo-stream/photo-stream.component';
import { AppPromoComponent } from './app-promo/app-promo.component';
import { ExistsComponent } from './exists/exists.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RatingComponent } from './rating/rating.component';
import { TopperSpeaksComponent } from './topper-speaks/topper-speaks.component';
import { DownloadAppComponent } from './download-app/download-app.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { FaceCampComponent } from './campaign/face-camp/face-camp/face-camp.component';
import { NormCampComponent } from './campaign/norm-camp/norm-camp/norm-camp.component';
import { TestCampComponent } from './campaign/test-camp/test-camp/test-camp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadsComponent,
    EarnWithUsComponent,
    SchoolTieUpsComponent,
    ContactUsComponent,
    MainScreenComponent,
    FooterComponent,
    WorkAsCollaboratorComponent,
    VideoFacultyComponent,
    LanguageTranslatorComponent,
    DubbingArtistComponent,
    EarnHomeComponent,
    AboutUsComponent,
    DownlodsHomeComponent,
    SubjectsComponent,
    TopicsComponent,
    DownloadsAppComponent,
    TopicDetailComponent,
    BlogsComponent,
    BlogsDetailComponent,
    BlogsHomeComponent,
    CourseHomeComponent,
    AllCourseComponent,
    CourseDetailComponent,
    BuyCourseComponent,
    PaymentSuccessComponent,
    PaymentFaildComponent,
    PaytmGatewayComponent,
    NotesPaymentsSuccessComponent,
    NotesPaymentsFaildsComponent,
    SearchDetailComponent, 
    ToolTipComponent,
    ModalComponent,
    CodeSnippetComponent,
    AnimationDetailsComponent,
    PhotoStreamComponent,
    AppPromoComponent,
    ExistsComponent,
    PrivacyPolicyComponent,
    FeedbackComponent,
    RatingComponent,
    TopperSpeaksComponent,
    DownloadAppComponent,
    ThankYouComponent,
    FaceCampComponent,
    NormCampComponent,
    TestCampComponent,
  ],
  imports: [
    NgxLoadingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,MatTooltipModule,
    HttpClientModule,       // (Required) For share counts
  //  HttpClient,  // (Optional) Add if you want tumblr share counts
    //import merials componenets
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    // ShareButtonsModule,
    // ShareButtonsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    AvatarModule,
    // ShareButtonModule.forRoot()
    // ShareButtonModule.forRoot(),

  ],
  providers: [CodeExampleService,
    ModalService,
    ToolTipComponent,
    ModalComponent,
    ToolTipService,
    AnimationCountService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { float: 'never' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

