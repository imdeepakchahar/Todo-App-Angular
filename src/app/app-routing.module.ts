import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TaskDetailComponent } from "./components/task-detail/task-detail.component";
const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'task/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
