import { Injectable } from '@angular/core';
import { Agent } from '../models/agent';
import { Observable, of } from 'rxjs';
import { mockAgents } from '../mock-data/mock-agents';
@Injectable({
  providedIn: 'root'
})
export class MockAgentService implements AgentService {
  constructor() { }
  
  getAgents(): Observable<Agent[]> {
    return of(mockAgents);
  }
}

export abstract class AgentService {
  abstract getAgents(): Observable<Agent[]>;
}