import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/model/todo.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{

  todoForm!: FormGroup;
  @Input() formDataValue!: Todo;
  @Output() add = new EventEmitter<Todo>();
  constructor(private formBuilder: FormBuilder){
  }
  ngOnInit(){ 
    this.initializeForm(); 
    this.todoForm.patchValue(this.formDataValue);
  }
  initializeForm(): void {
    this.todoForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      completed: [false],
    });
  }
  addTask() {
    if (this.todoForm.valid) {
      const task: Todo = this.todoForm.value; 
      this.add.emit(task);
      this.todoForm.reset();
    }
  }
}
