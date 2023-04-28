import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { CreateBudgetComponent } from './components/create-budget/create-budget.component';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewBudgetComponent } from './components/view-budget/view-budget.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'budgets',
    component: BudgetsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'budgets/create',
    component: CreateBudgetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'budgets/:id',
    component: EditBudgetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'budgets/:id/show',
    component: ViewBudgetComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
