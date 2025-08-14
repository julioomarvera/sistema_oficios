import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr:ToastrService) { }
  msjError(event: HttpErrorResponse){
    if(event.error.msg){
      this.toastr.error(event.error.msg,'Error',{ "positionClass" : "toast-bottom-center"});
    }
    else{
      this.toastr.error('Existe un error','Error');
    }
  }

   msjWarning(event: HttpErrorResponse){
    if(event.error.msg){
      this.toastr.warning(event.error.msg,'Error',{ "positionClass" : "toast-bottom-center"});
    }
    else{
      this.toastr.warning('Existe un error','Error');
    }
  }
}
