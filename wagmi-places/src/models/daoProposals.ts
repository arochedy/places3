export interface ErasePixelsProposal {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

export interface AddColorProposal {
  red: number;
  green: number;
  blue: number;
}
export interface AddColorProposalInfos
  extends ProposalInfos,
    AddColorProposal {}

export interface ChangeMapSizeProposal {
  newMapWidth: number;
  newMapHeight: number;
}

export interface ProposalInfos {
  proposer: string;
  description: string;
  votesFor: number;
  executed: boolean;
}

export interface ErasePixelsProposalInfos
  extends ProposalInfos,
    ErasePixelsProposal {}
export interface ChangeMapSizeProposalsInfos
  extends ProposalInfos,
    ChangeMapSizeProposal {}
