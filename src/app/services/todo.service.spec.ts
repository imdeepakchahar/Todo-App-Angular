import { TodoService } from './todo.service';
import { Todo } from '../model/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(); 
    localStorage.removeItem('tasks');
    service['tasks'] = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => { 
    const newTask: Todo = { id: 1, title: 'New Task', completed: false }; 
    service.addTask(newTask); 
    const updatedTasks = service.getTasks();  
    expect(updatedTasks.length).toBe(1);
  });

  it('should get a task by ID', () => { 
    const newTask: Todo = { id: 1, title: 'New Task', completed: false };
    service.addTask(newTask); 
    const foundTask = service.getTaskById(1);  
    expect(foundTask).toBe(newTask); 
  });

  it('should remove a task', () => {
    const newTask: Todo = { id: 1, title: 'New Task', completed: false };
    service.addTask(newTask);
    const initialTasks = service.getTasks();
    service.removeTask(1);
    const updatedTasks = service.getTasks();
    expect(updatedTasks.length).toBe(initialTasks.length - 1);
  });

  it('should edit a task', () => { 
    const newTask: Todo = { id: 1, title: 'New Task', completed: false };
    service.addTask(newTask);
    const editedTask: Todo = { id: 1, title: 'Edited Task', completed: false };
    service.editTask(editedTask); 
    const updatedTask = service.getTaskById(1);
    expect(updatedTask?.title).toBe('Edited Task'); 
  });

  it('should delete a task', () => {
    const newTask: Todo = { id: 1, title: 'New Task', completed: false };
    service.addTask(newTask);
    const initialTasks = service.getTasks();
    service.deleteTask(newTask);
    const updatedTasks = service.getTasks();
    expect(updatedTasks.length).toBe(initialTasks.length - 1); 
  });

  it('should mark a task as completed', () => { 
    const newTask: Todo = { id: 1, title: 'New Task', completed: false };
    service.addTask(newTask);
    service.markTaskAsCompleted(newTask);
    const updatedTask = service.getTaskById(1);
    expect(updatedTask?.completed).toBe(true); 
  });
});
