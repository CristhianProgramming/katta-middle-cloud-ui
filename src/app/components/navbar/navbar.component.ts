import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() isAdminPanel? : boolean
  @Output() closeSession : EventEmitter<any> = new EventEmitter<any>()
}
