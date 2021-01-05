import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MockAnalysisService, AnalysisService } from "../services/analysis.service";
import { MockAgentService, AgentService } from "../services/agent.service";
import { MockCallService, CallService } from "../services/call.service";
import { Analysis } from "../models/analysis";
import { Transcript } from '../models/transcript';
import { Script } from '../models/script';
import { Agent } from '../models/agent';
import { Call } from '../models/call';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [
    { provide: AgentService, useClass: MockAgentService },
    { provide: AnalysisService, useClass: MockAnalysisService },
    { provide: CallService, useClass: MockCallService }
  ]
})
export class AnalysisComponent implements OnInit, OnDestroy {
  analysis: Analysis;
  transcripts: Transcript[];
  scripts: Script[] = [];
  agents: Agent[] = [];
  calls: Call[] = [];
  selectedAgent: Agent;
  selectedCall: Call;
  defaultmatchingSensitivity: number = 38;
  matchingSensitivity: number;
  percentageScriptMatch: number;
  percentageTranscriptMatch: number;
  channels: { channelNo: number, name: string }[] = [];
  isLoadingAgents = true;
  isLoadingCall: boolean = true;
  isLoadingAnalysis: boolean;
  transcriptToolTipStyles: { display: string; 'top.px': number; 'left.px': number; };
  transcriptToolTipMessage: any;
  highlightedScript: number = null;
  agentsChannel: number = 1;
  scriptSerialNoOffset: number = 1;
  private unsubscribe$ = new Subject();

  constructor(
    private analysisService: MockAnalysisService,
    private agentService: MockAgentService,
    private callService: MockCallService,
  ) { }

  ngOnInit() {
    this.matchingSensitivity = this.defaultmatchingSensitivity;
    this.agentService
      .getAgents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(agents => {
        this.agents = agents;
        this.isLoadingAgents = false;
      }, () => { this.isLoadingAgents = false; })
  }

  onMatchingSensitivitySliderChange() {
    const { percentageScriptMatch, percentageTranscriptMatch } = this.calculateMatchingPercentage(this.analysis);
    this.percentageScriptMatch = percentageScriptMatch;
    this.percentageTranscriptMatch = percentageTranscriptMatch;
  }

  calculateMatchingPercentage(analysis: Analysis) {
    const transcript = analysis.transcript;
    const script = analysis.script;

    const transcriptMatchCount = transcript.filter(tr => tr.similarity >= (this.matchingSensitivity / 100)).length;
    const percentageTranscriptMatch = Math.round(transcriptMatchCount / transcript.length * 100);

    const scriptMatchCount = script.filter(sc => sc.similarity >= (this.matchingSensitivity / 100)).length;
    const percentageScriptMatch = Math.round(scriptMatchCount / script.length * 100);

    return { percentageScriptMatch, percentageTranscriptMatch };
  }

  onAgentSelectionChange() {
    this.isLoadingAnalysis = true;
    this.resetTranscriptAnalyzer();
    this.callService
      .getCallsByAgentId(this.selectedAgent.agent_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(calls => {
        this.calls = calls.sort((a, b) => a.call_start_time.valueOf() - b.call_start_time.valueOf());
        this.isLoadingAnalysis = false;
      }, () => { this.isLoadingAnalysis = false; })
  }

  onCallSelectionChange() {
    this.analysisService
      .getTranscriptByCallId(this.selectedCall.call_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(analysis => {
        this.analysis = analysis;
        this.transcripts = analysis.transcript;
        this.scripts = analysis.script;
        const { percentageScriptMatch, percentageTranscriptMatch } = this.calculateMatchingPercentage(analysis);
        this.percentageScriptMatch = percentageScriptMatch;
        this.percentageTranscriptMatch = percentageTranscriptMatch;
        this.setChannelsWithSpeaker(this.selectedCall);
        this.isLoadingCall = false;
      }, () => { this.isLoadingCall = false; })
  }


  convertMinutesToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft}`
  }

  previousChannelNo: number;
  getSpeakerByChannelNo(channelNo: number) {
    if (this.previousChannelNo === channelNo)
      return;
    this.previousChannelNo = channelNo;
    const speaker = this.channels.find(c => c.channelNo === channelNo)?.name?.split(' ');
    return speaker && speaker[0] || 'Unknown';
  }

  getFirstname(agent: Agent) {
    const name = agent.full_name.split(' ');
    if (!name) return '';
    return name[0];
  }
  resetTranscriptAnalyzer() {
    this.analysis = null;
    this.transcripts = null;
    this.selectedCall = null;
    this.scripts = null;
    this.matchingSensitivity = this.defaultmatchingSensitivity;
  }

  setChannelsWithSpeaker(call: Call) {
    const customerChannels: { channelNo: number; name: string; }[] =
      call.customer.map(customer => {
        return { channelNo: customer.channel_no, name: customer.full_name };
      });
    const agentsChannel: { channelNo: number; name: string; }[] = call.agent.map(agent => {
      return { channelNo: agent.channel_no, name: this.agents.find(a => a.agent_id === agent.agent_id).full_name };
    });
    this.channels = customerChannels.concat(agentsChannel);
  }

  onTranscriptMouseOver($event: any, transcript: Transcript) {
    if (!transcript) return;
    const similarity = Math.round(transcript.similarity * 100)
    if (!(similarity >= this.matchingSensitivity))
      return;
    const similarScript = this.scripts.find(sc => sc.similarity === transcript.similarity);
    if (!similarScript)
      return;

    const messageBoxOffsetX = 195;
    const messageBoxOffsetY = 90;

    this.highlightedScript = transcript.similarity;
    this.transcriptToolTipStyles = {
      'display': 'block',
      'top.px': +$event.clientY - messageBoxOffsetY,
      'left.px': messageBoxOffsetX
    };
    this.transcriptToolTipMessage =
      `${similarity}% matching with line #${similarScript.order + this.scriptSerialNoOffset} "${transcript.matching_sentence}"`;
  }

  onTranscriptMouseOut() {
    this.transcriptToolTipStyles = { 'display': 'none', 'top.px': 0, 'left.px': 0 };
    this.highlightedScript = null;
  };

  onScroll($event: any) {
    this.onTranscriptMouseOut();
  }

  @HostListener('document:click')
  onWindowClick() {
    this.onTranscriptMouseOut();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
