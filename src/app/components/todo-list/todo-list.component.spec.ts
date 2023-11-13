import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; 
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './../../services/todo.service'; 

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  let modalService: NgbModal;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [TodoService, NgbModal],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    modalService = TestBed.inject(NgbModal);
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load tasks on initialization', () => {
    const mockTasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }];
    jest.spyOn(todoService, 'getTasks').mockReturnValue(mockTasks);
    component.ngOnInit();
    expect(component.taskList).toEqual(mockTasks);
  });
  describe('Task', () => {
    it('should mark task as done and reload tasks', () => {
      const task = { id: 1, title: 'Task 1', description: 'Description 1' };
      jest.spyOn(todoService, 'markTaskAsCompleted');
      jest.spyOn(todoService, 'getTasks');
  
      component.markAsDone(task); 
      expect(todoService.markTaskAsCompleted).toHaveBeenCalledWith(task);
      expect(todoService.getTasks).toHaveBeenCalled();
    });
    it('should add a new task and dismiss modal', () => {
      const newTask = { title: 'New Task', description: 'New Description' };
      jest.spyOn(todoService, 'addTask'); 
      jest.spyOn(todoService, 'getTasks');
      const dismissAllSpy = jest.spyOn(modalService, 'dismissAll');
      component.addTask(newTask);
  
      expect(todoService.addTask).toHaveBeenCalledWith(newTask);
      expect(todoService.getTasks).toHaveBeenCalled();
      expect(dismissAllSpy).toHaveBeenCalled();
    });
    it('should edit an existing task dismiss modal', () => {
      const existingTask = { id: 1, title: 'Existing Task', description: 'Existing Description' };
      jest.spyOn(todoService, 'editTask');
      jest.spyOn(todoService, 'getTasks');
      const dismissAllSpy = jest.spyOn(modalService, 'dismissAll');
      component.addTask(existingTask);
  
      expect(todoService.editTask).toHaveBeenCalledWith(existingTask);
      expect(todoService.getTasks).toHaveBeenCalled();
      expect(dismissAllSpy).toHaveBeenCalled();
    });

    describe('Modal', () => {
      let modalRef: NgbModalRef;
      const modalOptions: any = {
        backdrop: 'static',
        keyboard: false,
        size: 'md',
      };
  
      beforeEach(() => {
        modalRef = {} as NgbModalRef;
      });
  
      it('should open add task modal', () => { 
        const modalServiceSpy = jest.spyOn(modalService, 'open').mockReturnValue(modalRef);
        component.openAddTaskModal();
        expect(modalServiceSpy).toHaveBeenCalled();
        expect(modalServiceSpy).toHaveBeenCalledWith(component.taskModal, modalOptions);
      });
  
      it('should edit task and open add task modal', () => {
        const task = { id: 1, title: 'Task 1', description: 'Description 1' };
        const modalServiceSpy = jest.spyOn(modalService, 'open').mockReturnValue(modalRef);
        component.editTask(task); 
        expect(component.formDataValue).toEqual(task);
        expect(modalServiceSpy).toHaveBeenCalledWith(component.taskModal, modalOptions);
      });
      it('should call addTaskAction and open modal with empty task data', () => {
        const emptyTask = { title: '', description: '' };
        const modalServiceSpy = jest.spyOn(modalService, 'open').mockReturnValue(modalRef);
        const openAddTaskModalSpy = jest.spyOn(component, 'openAddTaskModal');
        component.addTaskAction();
        expect(component.formDataValue).toEqual(emptyTask);
        expect(openAddTaskModalSpy).toHaveBeenCalled();
        expect(modalServiceSpy).toHaveBeenCalled();
      });
    });
  })
 
});
