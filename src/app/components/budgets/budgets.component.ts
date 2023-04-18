import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BudgetService } from 'src/app/services/budget.service';
import { Budget } from 'src/app/types/Budget';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent {
  constructor(private budgetService: BudgetService, private router: Router) {}

  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;

  budgets: Budget[] = [];

  ngOnInit(): void {
    this.budgetService
      .getBudgets()
      .subscribe((budgets) => (this.budgets = budgets));
  }

  editBudget(budget: Budget): void {
    this.router.navigateByUrl(`/budgets/${budget.id}`);
  }

  viewBudget(budget: Budget): void {
    this.router.navigateByUrl(`/budgets/${budget.id}/show`);
  }

  removeBudget(budget: Budget): void {
    this.budgetService
      .removeBudget(budget)
      .subscribe(
        () => (this.budgets = this.budgets.filter((b) => b.id !== budget.id))
      );
  }
}
