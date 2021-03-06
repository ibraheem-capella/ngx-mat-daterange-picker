import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxDrpOptions, PresetItem, Range } from './modules/ngx-mat-drp/model/model';

@Component({
  selector: 'ngx-mat-drp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  range: Range = {fromDate: new Date(), toDate: new Date()};
  presetRange: Range = {fromDate: new Date(), toDate: new Date()};
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];
  @ViewChild('pickerOne') pickerOne;

  ngOnInit() {
    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    this.setupPresets();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: {fromDate: today, toDate: today},
      applyLabel: 'Submit',
      // excludeWeekends:true,
      fromMinMax: {fromDate: null, toDate: today},
      toMinMax: {fromDate: null, toDate: today},
    };
  }

  updateRange(range: Range) {
    this.range = range;
  }

  preSelectedChanged(d: Range) {
    console.log(d);
    this.resetOptions(d);
  }

  resetOptions(d: Range) {
    const today = new Date();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: {fromDate: today, toDate: today},
      applyLabel: 'Done',
      // excludeWeekends:true,
      fromMinMax: {fromDate: null, toDate: d.toDate},
      toMinMax: {fromDate: d.fromDate, toDate: today},
    };
  }

  setupPresets() {
    const backDate = numOfDays => {
      // tslint:disable no-shadowed-variable
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    };

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      {
        presetLabel: 'Yesterday',
        range: {fromDate: yesterday, toDate: today}
      },
      {
        presetLabel: 'Last 7 Days',
        range: {fromDate: minus7, toDate: today}
      },
      {
        presetLabel: 'Last 30 Days',
        range: {fromDate: minus30, toDate: today}
      },
      {
        presetLabel: 'This Month',
        range: {fromDate: currMonthStart, toDate: currMonthEnd}
      },
      {
        presetLabel: 'Last Month',
        range: {fromDate: lastMonthStart, toDate: lastMonthEnd}
      }
    ];
  }

  reset() {
    const today = new Date();
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.pickerOne.resetDates({fromDate: currMonthStart, toDate: currMonthEnd});
  }
}
