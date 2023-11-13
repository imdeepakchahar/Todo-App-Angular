import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasks: Todo[] = [];
  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Todo[] {
    return this.tasks;
  }
  addTask(newTask: Todo) {
    newTask.id = this.tasks.length + 1
    newTask.completed = false 
    this.tasks.push(newTask);
    this.updateLocalStorage();
  }
  getTaskById(id: number): any {
    return this.tasks.find(task => task.id === id);
  }
  removeTask(id: number): void {
    this.tasks = this.tasks.filter(todo => todo.id !== id);
    this.updateLocalStorage();
  }
  editTask(editedTask: any) {
    this.tasks = this.tasks.map(task =>
      task.id === editedTask.id ? { ...task, title: editedTask.title } : task
    );
    this.updateLocalStorage();
  }
  
  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.updateLocalStorage();
  }

  markTaskAsCompleted(task: any) {
    this.tasks = this.tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    this.updateLocalStorage();
  }
}
