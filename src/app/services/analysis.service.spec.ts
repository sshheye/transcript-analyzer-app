/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockAnalysisService } from './analysis.service';

describe('Service: Transcript', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockAnalysisService]
    });
  });

  it('should inject MockAnalysisService', inject([MockAnalysisService], (service: MockAnalysisService) => {
    expect(service).toBeTruthy();
  }));

  it('should return analysis', inject([MockAnalysisService], (service: MockAnalysisService) => {
    service.getTranscriptByCallId("test").subscribe(analysis => {
      expect(analysis.call_id).toBeTruthy();
    })
  }));
});
