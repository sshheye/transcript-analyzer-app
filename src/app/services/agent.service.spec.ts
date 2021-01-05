/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockAgentService } from './agent.service';
import { Agent } from '../models/agent'


describe('Service: Agents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockAgentService]
    });
  });

  it('should inject MockAgentService', inject([MockAgentService], (service: MockAgentService) => {
    expect(service).toBeTruthy();
  }));

  it('should return list of agents', inject([MockAgentService], (service: MockAgentService) => {
    service.getAgents().subscribe(agent => {
      expect(agent.length).toBeTruthy();
    })
  }));

});
