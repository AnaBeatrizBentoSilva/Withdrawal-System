import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { PrintingComponent } from './components/printing/printing.component';
import { StatementComponent } from './pages/statement/statement.component';

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
    }
];
