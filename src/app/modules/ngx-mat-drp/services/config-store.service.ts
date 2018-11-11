import { Injectable } from '@angular/core';
import { NgxDrpOptions, Range } from '../model/model';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigStoreService {
  configUpdate$: Subject<NgxDrpOptions> = new Subject<NgxDrpOptions>();
  private _ngxDrpOptions: NgxDrpOptions;
  private defaultOptions = {
    excludeWeekends: false,
    animation: true,
    locale: 'en-US',
    fromMinMax: { fromDate: null, toDate: null },
    toMinMax: { fromDate: null, toDate: null }
  };

  constructor() {}

  get ngxDrpOptions(): NgxDrpOptions {
    return this._ngxDrpOptions;
  }

  set ngxDrpOptions(options: NgxDrpOptions) {
    this._ngxDrpOptions = { ...this.defaultOptions, ...options };
    this.configUpdate$.next(this._ngxDrpOptions);
  }
}
