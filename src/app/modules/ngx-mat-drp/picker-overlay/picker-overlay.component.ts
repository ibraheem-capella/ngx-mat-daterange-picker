import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PresetItem } from '../model/model';
import { RangeStoreService } from '../services/range-store.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { ConfigStoreService } from '../services/config-store.service';
import { pickerOverlayAnimations } from './picker-overlay.animations';

@Component({
  selector: 'ngx-mat-drp-picker-overlay',
  templateUrl: './picker-overlay.component.html',
  styleUrls: ['./picker-overlay.component.css'],
  animations: [pickerOverlayAnimations.transformPanel],
  encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  fromMinDate: Date;
  fromMaxDate: Date;
  toMinDate: Date;
  toMaxDate: Date;
  presets: Array<PresetItem> = [];
  startDatePrefix: string;
  endDatePrefix: string;
  applyLabel: string;
  cancelLabel: string;
  shouldAnimate: string;

  constructor(
    private rangeStoreService: RangeStoreService,
    private configStoreService: ConfigStoreService,
    private overlayRef: OverlayRef
  ) {
  }

  ngOnInit() {
    this.fromDate = this.rangeStoreService.fromDate;
    this.toDate = this.rangeStoreService.toDate;
    this.configStoreService.configUpdate$.subscribe((config)=>{
      this.startDatePrefix = config.startDatePrefix || 'FROM:';
      this.endDatePrefix = config.endDatePrefix || 'TO:';
      this.applyLabel = config.applyLabel || 'Apply';
      this.cancelLabel = config.cancelLabel || 'Cancel';
      this.presets = config.presets;
      this.shouldAnimate = config.animation
        ? 'enter'
        : 'noop';
      ({
        fromDate: this.fromMinDate,
        toDate: this.fromMaxDate
      } = config.fromMinMax);
      ({
        fromDate: this.toMinDate,
        toDate: this.toMaxDate
      } = config.toMinMax);
    });
  }

  updateFromDate(date) {
    this.fromDate = date;
    this.rangeStoreService.updatePreselectRange(this.fromDate, this.toDate);
  }

  updateToDate(date) {
    this.toDate = date;
    this.rangeStoreService.updatePreselectRange(this.fromDate, this.toDate);
  }

  updateRangeByPreset(presetItem: PresetItem) {
    this.updateFromDate(presetItem.range.fromDate);
    this.updateToDate(presetItem.range.toDate);
  }

  applyNewDates(e) {
    this.rangeStoreService.updateRange(this.fromDate, this.toDate);
    this.disposeOverLay();
  }

  discardNewDates(e) {
    // this.rangeStoreService.updateRange();
    this.disposeOverLay();
  }

  private disposeOverLay() {
    this.overlayRef.dispose();
  }
}
