import { Component } from '@angular/core';
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { BudgetService } from 'src/app/services/budget.service';
import { Budget } from 'src/app/types/Budget';

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

  ngOnInit(): void {
    this.budgetService
      .getBudgets()
      .subscribe((budgets) => (this.budgets = budgets));
  }

  removeBudget(budget: Budget): void {
    this.budgetService
      .removeBudget(budget)
      .subscribe(
        () => (this.budgets = this.budgets.filter((b) => b.id !== budget.id))
      );
  }
}
