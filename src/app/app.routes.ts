import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [

    { path: '', redirectTo: '/homepage', pathMatch: 'full' },

    { path: 'homepage', loadComponent: () => import('./pages/homepage/homepage.component').then((c) => c.HomepageComponent) },

    { path: "login", loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent) }, 

    { path: "register", loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent) },

    { path: "contacts", loadComponent: () => import('./pages/contacts/contacts.component').then((c) => c.ContattiComponent) },

    { path: "visit-list", loadComponent: () => import('./pages/visit-list/visit-list.component').then((c) => c.VisitListComponent) },

    { path: "visit-description/:tipoVisita", loadComponent: () => import('./pages/visit-description/visit-description.component').then((c) => c.VisitDescriptionComponent) },

    { path: "user-profile", loadComponent: () => import('./pages/user-profile/user-profile.component').then((c) => c.UserProfileComponent), canActivate: [AuthGuard],
        
        children:[{ path: ":id", loadComponent: () => import('./pages/booking-details/booking-details.component').then((c) => c.BookingDetailsComponent)}]},

    { path: "availability-calendar/:tipoVisita", loadComponent: () => import('./pages/availability-calendar/availability-calendar.component').then((c) => c.AvailabilityCalendarComponent), canActivate: [AuthGuard] },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
