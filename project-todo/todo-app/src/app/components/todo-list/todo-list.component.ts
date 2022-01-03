import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$!: Observable<Todo[]>;
  isShowPopup: boolean = false;
  msg: string = "";
  idItem: number = 0;
  constructor(private toDoService : TodoService) { }

  ngOnInit(): void {
    this.todos$ = this.toDoService.todos$;
  }

  changeStatus(value: Todo)
  {
    this.toDoService.changeTodoStatus(value.id, value.isCompleted);
  }

  changeContentItem(value: Todo)
  {
    this.toDoService.changeTodoContent(value.id, value.content);
  }

  deleteItem(id: any)
  {
    this.toDoService.deleteItem(id);
    this.closePopupDelete();
  }

  showPopupDelete(value: any)
  {
    this.isShowPopup = true;
    this.msg = "Bạn có chắc chắn muốn xóa item " + value.content;
    this.idItem = value.id;
  }

  closePopupDelete()
  {
    this.isShowPopup = false;
  }

}
