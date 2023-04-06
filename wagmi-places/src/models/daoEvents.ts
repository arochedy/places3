export interface NewErasePixelsProposalEvent {
  proposalId: number;
  proposer: string;
  description: string;
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

export interface NewAddColorProposalEvent {
  proposalId: number;
  proposer: string;
  description: string;
  red: number;
  green: number;
  blue: number;
}

export interface NewChangeMapSizeProposalEvent {
  proposalId: number;
  proposer: string;
  description: string;
  mapWidth: number;
  mapHeight: number;
}

export interface VotedEvent {
  proposalId: number;
  proposalType: number;
  voter: string;
  voteFor: boolean;
  votesFor: number;
  votesAgainst: number;
}

export interface ProposalExecutedEvent {
  proposalId: number;
  proposalType: number;
}
