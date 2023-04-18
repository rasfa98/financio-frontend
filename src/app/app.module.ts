import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { ButtonComponent } from './components/button/button.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BudgetsComponent,
    SidebarComponent,
    HeaderComponent,
    CurrencyComponent,
    ButtonComponent,
    BudgetFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
