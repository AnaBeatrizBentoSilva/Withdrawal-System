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

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "withdraw",
        component: WithdrawComponent
    },
    {
        path: "statement",
        component: StatementComponent
    },
    {
      path: "insurance",
      component: InsuranceComponent
    },
    {
      path: "investment",
      component: InvestmentComponent
    },
    {
      path: "transfer",
      component: TransferComponent
    },
    {
      path: "dashboard",
      component: DashboardComponent
    },
    {
      path: "userProfile",
      component: UserProfileComponent
    },
    {
      path: "exchange",
      component: ExchangeComponent
    },
    {
      path: "card",
      component: CardComponent
    }
];
