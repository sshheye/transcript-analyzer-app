import { Injectable } from '@angular/core';
import { Call } from '../models/call';
import { Observable, of } from 'rxjs';
import { mockCalls } from '../mock-data/mock-calls';
@Injectable({
  providedIn: 'root'
})
export class MockCallService implements CallService {
  constructor() { }
  
  getCalls(): Observable<Call[]> {
    return of(mockCalls);
  }

  getCallsByAgentId(agentId: string): Observable<Call[]> {
    return of(mockCalls.filter(c => { return c.agent.some(a => a.agent_id === agentId); }));
  }
}

export abstract class CallService {
  abstract getCalls(): Observable<Call[]>;
}