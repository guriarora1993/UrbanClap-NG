import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public toasterValue: string = ""

  constructor() { }

  public showToaster(value: string){
    this.toasterValue = value
  }

}
