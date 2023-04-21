import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/types/Expense';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  @Input() expense?: Expense;
  @Input() budgetId?: number;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  faCheck = faCheck;
  faClose = faClose;

  expenseForm = new FormGroup({
    id: new FormControl<number | null>(null),
    budgetId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, [Validators.required]),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const expense: Expense = changes['expense']?.currentValue;
    const budgetId: number = changes['budgetId']?.currentValue;

    if (expense) {
      this.expenseForm.setValue(expense);
    }

    if (budgetId) {
      this.expenseForm.patchValue({ budgetId });
    }
  }

  handleSubmit(): void {
    this.onSubmit.emit(this.expenseForm.value);
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
