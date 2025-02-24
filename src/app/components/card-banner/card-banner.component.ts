import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Billboard } from '../../shared/interface/Billboard.interface';

@Component({
  selector: 'app-card-banner',
  imports: [],
  templateUrl: './card-banner.component.html',
  styleUrl: './card-banner.component.scss',
})
export class CardBannerComponent {
  @Input() billboardDetails!: Billboard;
  @Input() isAdminPanel?: Boolean;
  @Output() deletedContent: EventEmitter<number> = new EventEmitter<number>();
  @Output() editContent: EventEmitter<number> = new EventEmitter<number>();
}
