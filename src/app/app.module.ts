import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    PieChartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
