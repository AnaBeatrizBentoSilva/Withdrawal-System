import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { PrintingComponent } from './components/printing/printing.component';
import { StatementComponent } from './pages/statement/statement.component';
import { InsuranceComponent } from './pages/insurance/insurance.component';
import { InvestmentComponent } from './pages/investment/investment.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { CardComponent } from './pages/card/card.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'statement', component: StatementComponent },
      { path: 'withdraw', component: WithdrawComponent },
      { path: 'deposit', component: DepositComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'card', component: CardComponent },
      { path: 'investment', component: InvestmentComponent },
      { path: 'insurance', component: InsuranceComponent },
      { path: 'exchange', component: ExchangeComponent },
      { path: 'userProfile', component: UserProfileComponent },
    ]
  },

  { path: 'login', component: LoginComponent }
];