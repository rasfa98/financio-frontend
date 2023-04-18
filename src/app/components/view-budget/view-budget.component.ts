import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';
import { Budget } from 'src/app/types/Budget';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent {
  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) {}

  budget!: Budget;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.budgetService.getBudget(id).subscribe((budget) => {
          this.budget = budget;
        });
      }
    });
  }
}
