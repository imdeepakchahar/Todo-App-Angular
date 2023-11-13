import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when onEdit is called', () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1' };
    const editEmitSpy = jest.spyOn(component.edit, 'emit');
    component.task = task;
    component.onEdit();
    expect(editEmitSpy).toHaveBeenCalledWith(task);
  });

  it('should emit done event when onMarkAsDone is called', () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1' };
    const doneEmitSpy = jest.spyOn(component.done, 'emit');
    component.task = task;
    component.onMarkAsDone();
    expect(doneEmitSpy).toHaveBeenCalledWith(task);
  });

});
