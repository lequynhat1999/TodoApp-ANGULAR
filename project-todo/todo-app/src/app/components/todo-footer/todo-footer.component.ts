import { Component, OnDestroy, OnInit } from '@angular/core';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';
import { map, takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];

  length = 0;
  //  observable để check xem có item nào đang complete k
  hasComplete$!: Observable<boolean>;


  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.hasComplete$ = this.todoService.todos$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  handleFilter(value: any) {
    this.filterButtons.forEach((btn) => {
      btn.isActive = btn.type === value.type;
    });

    this.todoService.filterTodos(value.type);
  }

  clearItemCompleted()
  {
    this.todoService.toggleCheckboxAll(false);
  }
}
