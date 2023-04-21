import { Component, Input } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ExpenseService } from 'src/app/services/expense.service';
import { CreateExpenseRequest, Expense } from 'src/app/types/Expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  constructor(private expsenseService: ExpenseService) {}

  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;

  expenses: Expense[] = [];
  showAddExpense: boolean = false;
  isEditingExpenseId: number | null = null;

  @Input() budgetId!: number;

  ngOnInit(): void {
    this.expsenseService
      .getExpenses(this.budgetId)
      .subscribe((expenses) => (this.expenses = expenses));
  }

  removeExpense(expense: Expense): void {
    this.expsenseService
      .removeExpense(expense)
      .subscribe(
        () => (this.expenses = this.expenses.filter((b) => b.id !== expense.id))
      );
  }

  toggleShowAddExpense(): void {
    this.showAddExpense = !this.showAddExpense;
  }

  setIsEditingExpense(expense: Expense): void {
    this.isEditingExpenseId = expense.id;
  }

  cancelIsEditingExpense(): void {
    this.isEditingExpenseId = null;
  }

  createExpense(expense: CreateExpenseRequest): void {
    this.expsenseService.createExpense(expense).subscribe((createdExpense) => {
      this.showAddExpense = false;
      this.expenses.push(createdExpense);
    });
  }

  updateExpense(expense: Expense): void {
    this.expsenseService.updateExpense(expense).subscribe(() => {
      const modifiedExpenseIndex = this.expenses
        .map((e) => e.id)
        .indexOf(expense.id);

      this.expenses[modifiedExpenseIndex] = expense;
      this.isEditingExpenseId = null;
    });
  }
}
