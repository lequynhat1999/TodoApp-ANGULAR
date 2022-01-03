import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // key để truy cập vào LocalStorage
  private static readonly ToDoStorageKey = 'todos';

  // arr để chứa data các item todo
  private todos!: Todo[];

  // arr để chứa data các item todo đã được filter
  private filteredTodos!: Todo[];

  // Subject để bắn ra dữ liệu về length của arr todo
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Subject để bắn ra dữ liệu arr todo
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  // Biến để chứa giá trị filter hiện tại: All hoặc Active hoặc Completed
  private currentFilter: Filter = Filter.All;

  // Observable để nhận dữ liệu từ displayTodoSubject gửi qua stream
  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable(); // expose observable nay de ben ngoai TodoService co the su dung

  // Observable để nhận dữ liệu to lengthSubject gửi qua stream
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService)
  {

  }

  /**
   * Thêm phần tử mới vào mảng todos
   * @param value
   */
  addTodo(value: string)
  {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, value);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }

  /**
   * Thay đổi trạng thái của todo
   * @param id
   * @param isCompleted
   */
  changeTodoStatus(id: number, isCompleted: boolean)
  {
    // thay đổi giá trị của phần tử trong mảng todos
    const index = this.todos.findIndex(todo => todo.id == id);
    const todoCurrent = this.todos[index];
    todoCurrent.isCompleted = isCompleted;
    this.todos.splice(index, 1, todoCurrent);
    this.updateToLocalStorage();
  }

  /**
   * Update content item
   * @param id
   * @param content
   */
  changeTodoContent(id: number, content: string)
  {
     // thay đổi giá trị của phần tử trong mảng todos
     const index = this.todos.findIndex(todo => todo.id == id);
     const todoCurrent = this.todos[index];
    todoCurrent.content = content;
    this.todos.splice(index, 1, todoCurrent);
    this.updateToLocalStorage();
  }

  /**
   * Delete item
   * @param id
   */
  deleteItem(id: number)
  {
    const index = this.todos.findIndex(todo => todo.id == id);
    this.todos.splice(index,1);
    this.updateToLocalStorage();
  }

  /**
   * Bắt sự kiện check all
   */
  toggleCheckboxAll(isCheckAll: boolean)
  {
    this.todos = this.todos.map(todo =>{
      return {
        ...todo,
        isCompleted: isCheckAll ? !this.todos.every(todo => todo.isCompleted) : false
      };
    })
    this.updateToLocalStorage();
  }

  /**
   * Lấy ra dữ liệu từ LocalStorage
   */
  fetchFromLocalStorage()
  {
    // nếu trong localStorage có Key todos thì trả về 1 arr Todo[], nếu k thì return arr null
    this.todos = this.storageService.getValue<Todo[]>(TodoService.ToDoStorageKey) || [];
    // clone deep
    this.filteredTodos = [...this.todos.map(todo => ({...todo}))];
    // gửi dữ liệu ra ngoài
    this.UpdateTodosData();
  }

  /**
   * Update dữ liệu trong LocalStorage
   */
  updateToLocalStorage()
  {
    // update dữ liệu trong LocalStorage
    this.storageService.setObject(TodoService.ToDoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    // gửi dữ liệu ra ngoài
    this.UpdateTodosData();
  }

  /**
   * Gửi dữ liệu ra bên ngoài bằng các Subject
   */
  private UpdateTodosData() {
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  /**
   * Hàm filter arr Todo
   * @param filter
   * @param isFiltering
   */
  filterTodos(filter : Filter, isFiltering: boolean = true)
  {
    this.currentFilter = filter;
    switch(filter)
    {
      case Filter.Active:
        this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map(todo => ({...todo}))];
        break;
    }
    if(isFiltering)
    {
      this.UpdateTodosData();
    }
  }

}
