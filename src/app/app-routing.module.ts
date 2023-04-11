import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { BudgetsComponent } from './components/budgets/budgets.component';

const routes: Routes = [
  {
    path: 'budgets',
    component: BudgetsComponent,
  },
  {
    path: 'budgets/:id',
    component: BudgetFormComponent,
  },
  {
    path: 'budgets/create',
    component: BudgetFormComponent,
  },
  {
    path: 'budgets/:id/show',
    component: BudgetFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
