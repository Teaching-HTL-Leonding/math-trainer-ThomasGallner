import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'exercise'},
  {path: 'exercise', component: ExerciseComponent},
  {path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
