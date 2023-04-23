import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Budget } from 'src/app/types/Budget';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent {
  constructor(private fb: FormBuilder) {}

  @Input() budget?: Budget;
  @Output() onSubmit = new EventEmitter();

  faPlus = faPlus;
  faTrash = faTrash;

  budgetForm = this.fb.group({
    id: undefined,
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    expenses: this.fb.array([]),
  });

  get expenses() {
    return this.budgetForm.controls['expenses'] as FormArray;
  }

  ngOnInit(): void {
    if (this.budget) {
      this.budgetForm.patchValue(this.budget);

      this.budget.expenses.forEach((expense) =>
        this.expenses.push(
          this.fb.group({
            id: expense.id,
            name: [expense.name, Validators.required],
            amount: [expense.amount, [Validators.required, Validators.min(1)]],
          })
        )
      );
    }
  }

  addExpense(): void {
    this.expenses.push(
      this.fb.group({
        id: undefined,
        name: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(1)]],
      })
    );
  }

  deleteExpense(expenseIndex: number): void {
    this.expenses.removeAt(expenseIndex);
  }

  handleSubmit(): void {
    this.onSubmit.emit(this.budgetForm.value);
  }
}
