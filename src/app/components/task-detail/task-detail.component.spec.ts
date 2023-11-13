import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [TodoService, { provide: ActivatedRoute, useValue: {  
        paramMap: of({ get: (key: string) => '1' })
      }}]
    });
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance; 
    todoService = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should load task from service based on route param', () => {
    const task = { id: 1, title: 'Sample Task', description: 'Task Description', completed: false };
    jest.spyOn(todoService, 'getTaskById').mockReturnValue(task);
    component.ngOnInit();
    expect(todoService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.task).toEqual(task);
  });
});
