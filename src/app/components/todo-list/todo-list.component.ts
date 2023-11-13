import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from './../../services/todo.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    private todoService: TodoService, 
    private modalService: NgbModal,
  ) {}
  taskList!: Todo[];
  formDataValue!:Todo;
  @ViewChild('taskModal') taskModal!: TemplateRef<any>; 
  ngOnInit() {
    this.loadTasks();
  }
  loadTasks() {
    this.taskList = this.todoService.getTasks();
  }

  editTask(task: any) {
    this.formDataValue = task;
    this.openAddTaskModal(); 
  }

  markAsDone(task: any) {
    this.todoService.markTaskAsCompleted(task);
    this.loadTasks(); 
  }

  addTask(task: Todo) {
    if(task?.id){
      this.todoService.editTask(task);
    }else{
      this.todoService.addTask(task);
    }
    
    this.loadTasks(); 
    this.modalService.dismissAll();
  }
  addTaskAction(){
    this.formDataValue = { title: '', description: ''};
    this.openAddTaskModal();
  }
  openAddTaskModal() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'md'
    };
    this.modalService.open(this.taskModal, modalOptions);
  }

}
