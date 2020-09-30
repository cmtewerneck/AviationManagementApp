// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// COMPONENTES
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        MainSidebarComponent,
        PageNotFoundComponent,
        ControlSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MainSidebarComponent,
        PageNotFoundComponent,
        ControlSidebarComponent
    ]
})
export class NavegacaoModule { }
