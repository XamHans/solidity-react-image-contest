//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VoteManager {


    struct Candidate {
        uint id;
        uint totalVote;
        string name;
        string imageHash;
        address candidateAddress;
    }
    using Counters for Counters.Counter;
    Counters.Counter private candidatesIds;

    mapping(address => Candidate) private candidates;
    mapping(uint=> address ) private accounts;

    event Voted(address indexed _candidateAddress, address indexed _voterAddress, uint _totalVote);
    event candidateCreated(address indexed canditateAddress, string name);

    function registerCandidate(string calldata _name, string calldata _imageHash) external {
        //check if candidate already registered
        require(msg.sender != address(0));
        
        candidatesIds.increment();
        uint candidateId = candidatesIds.current();
        address _address = address(msg.sender);
        Candidate memory newCandidate = Candidate(candidateId, 0, _name, _imageHash, _address);
        candidates[_address] = newCandidate;
        accounts[candidateId] = msg.sender;
        emit candidateCreated(_address, _name);
    }

      /* fetches all candidates */
    function fetchCandidates() external view returns ( Candidate[] memory) {
        uint itemCount = candidatesIds.current();

        Candidate[] memory candidatesArray = new Candidate[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Candidate memory currentCandidate = candidates[accounts[currentId]];
            candidatesArray[i] = currentCandidate;
        }
        return candidatesArray;
    }


    function vote(address _forCandidate) external {
        candidates[_forCandidate].totalVote += 1;
        emit Voted(_forCandidate, msg.sender, candidates[_forCandidate].totalVote);
    }

}
