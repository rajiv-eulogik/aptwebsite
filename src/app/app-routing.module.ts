import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screen/home/home.component';
import { DownloadsComponent } from './screen/downloads/downloads.component';
import { EarnWithUsComponent } from './screen/earn-with-us/earn-with-us.component';
import { SchoolTieUpsComponent } from './screen/school-tie-ups/school-tie-ups.component';
import { ContactUsComponent } from './screen/contact-us/contact-us.component';
import { MainScreenComponent } from './screen/main-screen/main-screen.component';
import { WorkAsCollaboratorComponent } from './screen/work-as-collaborator/work-as-collaborator.component';
import { VideoFacultyComponent } from './screen/video-faculty/video-faculty.component';
import { LanguageTranslatorComponent } from './screen/language-translator/language-translator.component';
import { DubbingArtistComponent } from './screen/dubbing-artist/dubbing-artist.component';
import { EarnHomeComponent } from './screen/earn-home/earn-home.component';
import { AboutUsComponent } from './screen/about-us/about-us.component';
import { DownlodsHomeComponent } from './screen/downloads/downlods-home/downlods-home.component';
import { SubjectsComponent } from './screen/downloads/subjects/subjects.component';
import { TopicsComponent } from './screen/downloads/topics/topics.component';
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
import { PhotoStreamComponent } from './screen/photo-stream/photo-stream.component';
import {AppPromoComponent} from './app-promo/app-promo.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {FaceCampComponent} from './campaign/face-camp/face-camp/face-camp.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent  },
    { path: 'search-detail', component: SearchDetailComponent},
    { path: 'photo-stream', component: PhotoStreamComponent},
    { path: 'downloads', component: DownlodsHomeComponent, children: [
      { path: '', component: DownloadsComponent },
      { path: 'Subjects', component: SubjectsComponent },
      { path: 'Topics', component: TopicsComponent},
      { path: 'Topic-detail', component: TopicDetailComponent },
      { path: 'paytm', component: PaytmGatewayComponent },
      { path: 'notes-payments-success', component: NotesPaymentsSuccessComponent},
      { path:  'notes-payments-failed', component: NotesPaymentsFaildsComponent}
    ]},
    {path: 'downloadapp', component: AppPromoComponent},
    { path: 'school-tie-ups', component: SchoolTieUpsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'Earn-with-us', component: EarnHomeComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'Join-team-apt', component: EarnWithUsComponent },
      { path: 'work-as-Collabotor', component: WorkAsCollaboratorComponent},
      { path: 'video-faculty', component: VideoFacultyComponent},
      { path: 'Language-translator', component: LanguageTranslatorComponent},
      { path: 'Dubbing-Artist', component: DubbingArtistComponent }
    ]},
    {path: 'blogs', component: BlogsHomeComponent , children: [
      { path: '', component: BlogsComponent },
      { path: 'blog-details', component: BlogsDetailComponent },
    ]},
    {path: 'course', component: CourseHomeComponent, children: [
      { path: '', component: AllCourseComponent },
      { path: 'course-details', component: CourseDetailComponent },
      { path: 'buy-course' , component: BuyCourseComponent },
      { path: 'payments-success', component: PaymentSuccessComponent},
      { path:  'payments-failed', component: PaymentFaildComponent},
      { path: 'paytm', component: PaytmGatewayComponent }
    ]},
    {path: 'privacy-policy', component: PrivacyPolicyComponent },
    {path:'feedback', component: FeedbackComponent}
  ]},
  { path: 'notes-payments-success1', component: NotesPaymentsSuccessComponent},
  { path: 'payments-success', component: PaymentSuccessComponent},
  { path:  'notes-payments-failed', component: NotesPaymentsFaildsComponent},
  {path: 'thank-you', component: ThankYouComponent},
  {path: 'face-to-face', component: FaceCampComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
// {
//   "paytmDownloadSuccess":"localhost:4200/downloads/notes-payments-success",
//    "paytmDownloadFailed":"localhost:4200/downloads/notes-payments-failed"  , 
//    "paytmCourseFailed":"localhost:4200/course/payments-failed",  
//    "paytmCourseSuccess": "localhost:4200/course/payments-success"
// }