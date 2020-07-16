import { Injectable } from '@angular/core';
import { IVivusInstance } from './vivus-instance.interface';
import { IVivusOptions } from './vivus-options.interface';

declare var Vivus: any;

@Injectable({
  providedIn: 'root',
})
export class VivusService {
  lanceVivus(
    cible: string,
    options: Partial<IVivusOptions>,
    callback?: Function
  ) {
    return new Vivus(cible, options, callback) as IVivusInstance;
  }

  constructor() {}
}
