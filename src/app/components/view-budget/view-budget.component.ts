import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';

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
