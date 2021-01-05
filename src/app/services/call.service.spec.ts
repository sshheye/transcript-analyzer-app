/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockCallService } from './call.service';

describe('Service: Call', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockCallService]
    });
  });

  it('should inject MockCallService', inject([MockCallService], (service: MockCallService) => {
    expect(service).toBeTruthy();
  }));

  it('should return list of calls', inject([MockCallService], (service: MockCallService) => {
    service.getCalls().subscribe(calls => {
      expect(calls.length).toBeTruthy();
    })
  }));

  it('should return call by agent_id', inject([MockCallService], (service: MockCallService) => {
    const agent_id = "A7f63308a";
    service.getCallsByAgentId(agent_id).subscribe(call => {
      expect(call.length).toBeTruthy();
    })
  }));
});
