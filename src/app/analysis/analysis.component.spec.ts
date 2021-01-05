/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnalysisComponent } from './analysis.component';
import { mockCalls } from '../mock-data/mock-calls';
import { mockAnalysis } from '../mock-data/mock-analysis';
import { AgentService, MockAgentService } from '../services/agent.service';
import { AnalysisService, MockAnalysisService } from '../services/analysis.service';
import { CallService, MockCallService } from '../services/call.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { HeaderComponent } from '../header/header.component';
describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnalysisComponent,
        PieChartComponent,
        HeaderComponent],
      imports: [
        RouterTestingModule,
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
      providers: [
        { provide: AgentService, useClass: MockAgentService },
        { provide: AnalysisService, useClass: MockAnalysisService },
        { provide: CallService, useClass: MockCallService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return specified minutes in  time format', () => {
    const time1 = component.convertMinutesToTime(15);
    const time2 = component.convertMinutesToTime(70);
    expect(time1).toBe('00:15');
    expect(time2).toBe('01:10');
  });

  it('should reset analysis data', () => {
    component.resetTranscriptAnalyzer();
    expect(component.analysis).toBe(null);
    expect(component.transcripts).toBe(null);
    expect(component.selectedCall).toBe(null);
    expect(component.scripts).toBe(null);
    expect(component.matchingSensitivity).toBe(component.defaultmatchingSensitivity);
  });


  it('should set channels with speaker details', () => {
    const call = mockCalls[0];
    component.setChannelsWithSpeaker(call);
    expect(component.channels[1].channelNo).toBe(1);
    expect(component.channels[0].channelNo).toBe(2);
  });

  it('should return speakers name by channel no', () => {
    component.channels = [{ channelNo: 1, name: 'john' }, { channelNo: 2, name: 'doe' }];
    const speaker1 = component.getSpeakerByChannelNo(1);
    const speaker2 = component.getSpeakerByChannelNo(2);
    const speaker3 = component.getSpeakerByChannelNo(3);

    expect(speaker1).toBe('john');
    expect(speaker2).toBe('doe');
    expect(speaker3).toBe('Unknown');

  });

  it(`should calculate and return matching percentages'`, () => {
    const analysis = mockAnalysis;
    component.matchingSensitivity = 1;
    const { percentageScriptMatch, percentageTranscriptMatch } = component.calculateMatchingPercentage(analysis);
    expect(percentageScriptMatch).toBe(100);
    expect(percentageTranscriptMatch).toBe(76);
  });
});
