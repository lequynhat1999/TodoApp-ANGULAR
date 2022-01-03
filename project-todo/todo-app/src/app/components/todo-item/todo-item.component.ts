import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;

  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() changeContentItem: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() deleteItem: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() showPopupDelete: EventEmitter<any> = new EventEmitter<any>();

  isHovered = false;
  isEditing = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeTodoStatus()
  {
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo.isCompleted});
  }

  submitEdit(value: any)
  {
    const {keyCode} = value;
    event?.preventDefault();
    if(keyCode == 13)
    {
      this.changeContentItem.emit(this.todo);
    }
    this.isEditing = false;
  }

  deleteTodo(value: any)
  {
    // this.deleteItem.emit(value);

    // mo popup delete
    this.showPopupDelete.emit(value);
  }
}
