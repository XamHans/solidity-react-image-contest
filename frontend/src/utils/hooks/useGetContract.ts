import { Contract, ethers } from "ethers";
import VoteManagerContract  from '../../../../backend/artifacts/contracts/VoteManager.sol/VoteManager.json'

export default function getContract(contractAddress: string): Contract {
  const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    VoteManagerContract.abi,
    signer
  );
  return contract;
}