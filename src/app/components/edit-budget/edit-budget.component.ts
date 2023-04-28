import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.scss'],
})
export class EditBudgetComponent {
  constructor(
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  budget!: Budget;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);

      if (id) {
        this.budgetService.getBudget(id).subscribe((budget) => {
          this.budget = budget;
        });
      }
    });
  }

  onSubmit(budget: Budget): void {
    this.budgetService
      .updateBudget(budget)
      .subscribe(() => this.router.navigateByUrl('/budgets'));
  }
}
