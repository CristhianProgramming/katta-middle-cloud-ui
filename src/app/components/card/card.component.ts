import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../shared/interface/Movie.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movieDetails! : Movie;
  @Input() isAdminPanel? : Boolean;
  @Output() deletedContent : EventEmitter<number> = new EventEmitter<number>();
  @Output() editContent : EventEmitter<number> = new EventEmitter<number>();
}
