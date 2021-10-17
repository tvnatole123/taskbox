import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksState, ArchiveTask, PinTask } from '../state/task.state';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  template: `
  <app-pure-task-list
      [tasks]="tasks$ | async"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
  `,
})
export class TaskListComponent {
  @Select(TasksState.getAllTasks) tasks$: Observable<Task[]>;

  constructor(private store: Store) { }

  /**
   * @ignore
   * Component property to define ordering of tasks
  */
  tasksInOrder: Task[] = [];

  // /** Checks if it's in loading state */
  // @Input() loading = false;

  // /** Event to change the task to pinned */
  // // tslint:disable-next-line: no-output-on-prefix
  // @Output()
  // onPinTask = new EventEmitter<Event>();

  // /** Event to change the task to archived */
  // // tslint:disable-next-line: no-output-on-prefix
  // @Output()
  // onArchiveTask = new EventEmitter<Event>();

  // @Input()
  // set tasks(arr: Task[]) {
  //   this.tasksInOrder = [
  //     ...arr.filter(t => t.state === 'TASK_PINNED'),
  //     ...arr.filter(t => t.state !== 'TASK_PINNED'),
  //   ];
  // }

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: string) {
    this.store.dispatch(new ArchiveTask(id));
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: string) {
    this.store.dispatch(new PinTask(id));
  }
}
