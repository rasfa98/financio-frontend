import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateBudgetComponent } from './components/create-budget/create-budget.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewBudgetComponent } from './components/view-budget/view-budget.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BudgetsComponent,
    SidebarComponent,
    HeaderComponent,
    CurrencyComponent,
    ButtonComponent,
    BudgetFormComponent,
    EditBudgetComponent,
    CreateBudgetComponent,
    ViewBudgetComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
