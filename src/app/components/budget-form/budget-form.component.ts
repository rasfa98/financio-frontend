import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent {
  budgetForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    amount: new FormControl(0),
  });
}
