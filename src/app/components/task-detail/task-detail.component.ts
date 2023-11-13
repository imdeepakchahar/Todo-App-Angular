import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
      const taskId = params.get('id');
      this.loadTasks(parseInt(taskId)); 
    });
  }
  loadTasks(taskId:number) {
    this.task = this.todoService.getTaskById(taskId);
  }

}
