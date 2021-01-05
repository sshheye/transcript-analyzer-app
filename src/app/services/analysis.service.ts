import { Injectable } from '@angular/core';
import { Analysis } from '../models/analysis';
import { Observable, of } from 'rxjs';
import { mockAnalysis } from '../mock-data/mock-analysis';
@Injectable({
  providedIn: 'root'
})
export class MockAnalysisService implements AnalysisService {
  constructor() { }
  
  getTranscriptByCallId(callId: string): Observable<Analysis> {
    return of(mockAnalysis);
  }
}

export abstract class AnalysisService {
  abstract getTranscriptByCallId(callId: string): Observable<Analysis>;
}