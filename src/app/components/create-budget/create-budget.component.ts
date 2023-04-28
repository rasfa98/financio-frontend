import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss'],
})
export class CreateBudgetComponent {
  constructor(private budgetService: BudgetService, private router: Router) {}

  onSubmit(budget: Budget): void {
    this.budgetService
      .createBudget(budget)
      .subscribe((budget) =>
        this.router.navigateByUrl(`/budgets/${budget.id}/show`)
      );
  }
}
