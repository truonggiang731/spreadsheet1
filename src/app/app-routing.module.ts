import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import Spreadsheet from 'x-data-spreadsheet';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
