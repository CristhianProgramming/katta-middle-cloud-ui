import { Component, Input } from '@angular/core';
import { Movie } from '../../shared/interface/Movie.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movieDetails! : Movie;
}
