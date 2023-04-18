import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { CreateBudgetComponent } from './components/create-budget/create-budget.component';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component';
import { ViewBudgetComponent } from './components/view-budget/view-budget.component';

const routes: Routes = [
  {
    path: 'budgets',
    component: BudgetsComponent,
  },
  {
    path: 'budgets/create',
    component: CreateBudgetComponent,
  },
  {
    path: 'budgets/:id',
    component: EditBudgetComponent,
  },
  {
    path: 'budgets/:id/show',
    component: ViewBudgetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
