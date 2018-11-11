import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Range } from '../model/model';
import { Subject } from 'rxjs';
/* import { DATE } from '../ngx-drp.module'; */

export const DATE = new InjectionToken<Date>('date');

@Injectable()
export class RangeStoreService {
  rangeUpdate$: Subject<Range> = new Subject<Range>();
  preselectRangeUpdate$: Subject<Range> = new Subject<Range>();

  private _preselectFromDate: Date;
  private _preselectToDate: Date;

  constructor(
    @Inject(DATE) private _fromDate: Date,
    @Inject(DATE) private _toDate: Date
  ) {
  }

  /* set fromDate(fromDate:Date) {
    this._fromDate = fromDate;
  } */

  get fromDate(): Date {
    return this._fromDate;
  }

  /* set toDate(toDate:Date) {
    this._toDate = toDate;
  } */

  get toDate(): Date {
    return this._toDate;
  }

  updatePreselectRange(fromDate: Date = this._fromDate, toDate: Date = this._toDate) {
    this._preselectFromDate = fromDate;
    this._preselectToDate = toDate;
    this.preselectRangeUpdate$.next({fromDate: this._preselectFromDate, toDate: this._preselectToDate});
  }

  updateRange(fromDate: Date = this._fromDate, toDate: Date = this._toDate) {
    this._fromDate = fromDate;
    this._toDate = toDate;
    this.rangeUpdate$.next({fromDate: this._fromDate, toDate: this._toDate});
  }
}
