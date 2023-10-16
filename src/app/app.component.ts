import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import {  } from 'x-data-spreadsheet';
import { WorkBook, WorkSheet, WritingOptions, read, writeFileXLSX as writeFile, utils, version, set_cptable, writeFileXLSX } from 'xlsx';
import { XlsxConverterService } from './xlsx-converter.service';

type AOA = any[][];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

	wopts: WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
  title = 'testspreadsheet';
  
  @ViewChild(SpreadsheetComponent, {static: false}) spreadsheetComponent!: SpreadsheetComponent

  constructor(
    private readonly sv: XlsxConverterService
  ){}

  ngAfterViewInit(): void {
    
  }
  
  visible = false;
  size: 'large' | 'default' = 'default';
  placement: NzDrawerPlacement = 'bottom';
  open(): void {
    this.size = 'large';
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: WorkBook = read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      // const ws: WorkSheet = wb.Sheets[wsname];

      this.spreadsheetComponent.loadDataToSpreadsheet(this.sv.stox(wb));
    };
    reader.readAsArrayBuffer(target.files[0]);
    
  }

  export(): void {
    const dt = this.spreadsheetComponent.getData();
  if (dt) {
    const xlsxData = this.sv.xtos(dt);
    if (xlsxData) {
      writeFileXLSX(xlsxData, this.fileName);
    } else {
      console.error('No data found for export');
    }
  } else {
    console.error('Spreadsheet data is undefined');
  }
	}
}
