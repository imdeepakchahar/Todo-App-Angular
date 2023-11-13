import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() task: any;
  @Output() edit = new EventEmitter<any>();
  @Output() done = new EventEmitter<any>();
  onEdit() {
    this.edit.emit(this.task);
  }

  onMarkAsDone() {
    this.done.emit(this.task);
  }
}
