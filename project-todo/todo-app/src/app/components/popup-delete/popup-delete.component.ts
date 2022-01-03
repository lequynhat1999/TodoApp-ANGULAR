import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss']
})
export class PopupDeleteComponent implements OnInit {

  @Input() isShowPopup!: boolean;
  @Input() msg!: string;
  @Input() idItem!: number;

  @Output() closePopupDelete: EventEmitter<any> = new EventEmitter<any>();

  @Output() confirmPopupDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  closePopup()
  {
    this.closePopupDelete.emit();
  }

  confirmDelete()
  {
    this.confirmPopupDelete.emit(this.idItem);
  }
}
