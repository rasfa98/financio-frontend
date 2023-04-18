import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';
import { FormMode } from 'src/app/types/FormMode';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent {
  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  mode = FormMode.CREATE;
  budgetForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, [Validators.required]),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.budgetService.getBudget(id).subscribe((budget) => {
          this.budgetForm.setValue({
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          });
        });
      }
    });

    this.route.data.subscribe((data) => {
      this.mode = data['mode'];
    });
  }

  onSubmit() {
    const { id, name, amount } = this.budgetForm.value;

    const budget = {
      id: id || null,
      name: name || '',
      amount: amount || 0,
    };

    if (this.mode === FormMode.EDIT) {
      this.budgetService
        .updateBudget(budget)
        .subscribe(() => this.router.navigateByUrl('/budgets'));
    }

    if (this.mode === FormMode.CREATE) {
      this.budgetService
        .createBudget(budget)
        .subscribe((budget) =>
          this.router.navigateByUrl(`/budgets/${budget.id}/show`)
        );
    }
  }
}
