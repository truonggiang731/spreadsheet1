import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import Spreadsheet, { Cell, Options } from 'x-data-spreadsheet';


type AOA = any[][];
@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements AfterViewInit {

  @Input() DataTransfer!: any;
  s !: Spreadsheet;
  ngAfterViewInit(): void {
    const options: Options = {
      mode: 'edit', // edit | read
      showToolbar: true,
      showGrid: true,
      showContextmenu: true,
      view: {
        height: () => (document.documentElement.clientHeight * 0.7),
        width: () => (document.documentElement.clientWidth * 0.96),
      },
      row: {
        len: 100,
        height: 25,
      },
      col: {
        len: 26,
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      },
        style: {
          bgcolor: '#ffffff',
          align: 'left',
          valign: 'middle',
          textwrap: false,
          strike: false,
          underline: false,
          color: '#0a0a0a',
          font: {
            name: 'Helvetica',
            size: 10,
            bold: false,
            italic: false,
          },
      },
    }

    this.s = window.x_spreadsheet("#x-spreadsheet-demo", options)
      .loadData({}) // load data
      .change(data => {
        // save data to db
      }); 
      
  }
  loadDataToSpreadsheet(data: any) {
    this.s.loadData(data);
    console.log(data);
  }
  getData(){
    this.s.getData();
    return this.s.getData()

  }
}

