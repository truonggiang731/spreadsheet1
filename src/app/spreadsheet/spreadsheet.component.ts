import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Spreadsheet, { Cell } from 'x-data-spreadsheet';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    let s: Spreadsheet = window.x_spreadsheet("#x-spreadsheet-demo")
      .loadData({}) // load data
      .change(data => {
        // save data to db
      });
      s.cell(4,5,6)
  }

}
