import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'testspreadsheet';
  
  //@ViewChild(SpreadsheetComponent, {static: false}) sheet!: SpreadsheetComponent

  ngAfterViewInit(): void {
    
  }
  //checkElement: boolean = false;
  // isVisible = false;
  // isOkLoading = false;

  // // click(){
  // //   this.checkElement = !this.checkElement;
  // //   console.log(this.checkElement)
  // // }

  // showModal(): void {
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 3000);
  // }

  // handleCancel(): void {
  //   this.isVisible = false;
  // }



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
}
