import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

const EXCEL_TYPE = 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8';
const EXCEL_EXT = '.xlsx';

  @Injectable({
  providedIn: 'root'
})
export class ExporterService {
  dPipe = new DatePipe('short');
  constructor() { }

    exportToExcel(json:any[], excelFileName:string):void{
      const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook : XLSX.WorkBook = { Sheets:{'data':worksheet},
      SheetNames:['data']
    };
    const excleBuffer: any = XLSX.write(workbook,{ bookType:'xlsx', type:'array'});
    // call method buffer and filename
    this.saveExcel(excleBuffer,excelFileName);
    
  }
  private saveExcel(buffer: any, fileName:string):void{
      const data: Blob = new Blob([buffer], {type :EXCEL_TYPE});
      FileSaver.saveAs(data, fileName +'_export_' + Date() + EXCEL_EXT )
  }
  
}
