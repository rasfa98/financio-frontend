import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { FormMode } from './types/FormMode';

const routes: Routes = [
  {
    path: 'budgets',
    component: BudgetsComponent,
  },
  {
    path: 'budgets/create',
    component: BudgetFormComponent,
    data: {
      mode: FormMode.CREATE,
    },
  },
  {
    path: 'budgets/:id',
    component: BudgetFormComponent,
    data: {
      mode: FormMode.EDIT,
    },
  },
  {
    path: 'budgets/:id/show',
    component: BudgetFormComponent,
    data: {
      mode: FormMode.VIEW,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
