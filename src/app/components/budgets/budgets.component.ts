import { Component } from '@angular/core';
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent {
  constructor(private budgetService: BudgetService) {}

  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  faPlus = faPlus;

  budgets: Budget[] = [];
  isLoading: boolean = false;

  calculateRemainingAmount(budget: Budget): number {
    const sumExpenses = budget.expenses.reduce(
      (acc, curr) => (acc += curr.amount),
      0
    );

    return budget.amount - sumExpenses;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.budgetService.getBudgets().subscribe({
      next: (budgets) => (this.budgets = budgets),
      complete: () => (this.isLoading = false),
    });
  }

  removeBudget(budget: Budget): void {
    this.budgetService
      .removeBudget(budget)
      .subscribe(
        () => (this.budgets = this.budgets.filter((b) => b.id !== budget.id))
      );
  }
}
