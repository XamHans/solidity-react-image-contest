import { BigNumber } from "ethers";

export interface Candidate {
    id: number;
    totalVote: number | BigNumber;
    name: string;
    imageHash?: string;
    candidateAddress?: string;
}

export interface CandidateFormData {
    name?: string;
    imageHash?: string;
}
