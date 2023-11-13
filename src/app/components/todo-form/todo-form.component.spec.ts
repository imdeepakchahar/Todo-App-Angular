import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      providers: [FormBuilder],
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit with form data if present', () => {
    component.formDataValue = { id: 1, title: 'Test', description: 'Test description', completed: false };
    component.ngOnInit();
    expect(component.todoForm.get('title')?.value).toBe('Test');
    expect(component.todoForm.get('description')?.value).toBe('Test description');
  });

  it('should emit task on addTask when form is valid', () => {
    const mockTask = { id: 1, title: 'Test', description: 'Test description', completed: false };
    component.ngOnInit(); 
    component.todoForm.setValue(mockTask);
    const addEmitSpy = jest.spyOn(component.add, 'emit');
    component.addTask();
    expect(addEmitSpy).toHaveBeenCalledWith(mockTask);
    expect(component.todoForm.pristine).toBe(true);
  });

  it('should not emit task on addTask when form is invalid', () => {
    const invalidTask = { id: '', title: '', description: 'Test description', completed: false };
    component.ngOnInit(); 
    component.todoForm.setValue(invalidTask);
    const addEmitSpy = jest.spyOn(component.add, 'emit');
    component.addTask();
    expect(addEmitSpy).not.toHaveBeenCalled();
  });

  it('should reset the form on successful adding of a task', () => {
    const mockTask = { id: 1, title: 'Test', description: 'Test description', completed: false };
    component.ngOnInit();
    component.todoForm.setValue(mockTask);
    component.addTask();
    expect(component.todoForm.get('title')?.value).toBe(null);
    expect(component.todoForm.get('description')?.value).toBe(null);
  });

});
