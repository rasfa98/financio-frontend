import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from 'src/app/types/Budget';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent {
  @Input() budget?: Budget;
  @Output() onSubmit = new EventEmitter();

  budgetForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, [Validators.required]),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const budget = changes['budget'].currentValue;

    if (budget) {
      this.budgetForm.setValue({
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
      });
    }
  }

  handleSubmit(): void {
    this.onSubmit.emit(this.budgetForm.value);
  }
}
