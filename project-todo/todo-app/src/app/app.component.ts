import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-app';

  hasTodo$!: Observable<boolean>;
  constructor(private  todoService: TodoService)
  {

  }

  ngOnInit(){
    this.todoService.fetchFromLocalStorage();

    // nếu mà length > 0 thì trả về giá trị true
    // pipe để cast kiểu length$ observable<number> về thành hasTodo$<boolean>
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
}
