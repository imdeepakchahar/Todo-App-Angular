import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => { 
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TodoApp'`, () => { 
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TodoApp');
  });
});
