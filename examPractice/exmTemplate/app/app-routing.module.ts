import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: './home/user/user.module#UserPageModule'
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: './home/admin/admin.module#AdminPageModule'
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
