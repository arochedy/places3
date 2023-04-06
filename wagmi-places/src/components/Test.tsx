import {
  useAccount,
  useContractWrite,
  useEnsName,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function TestSS() {
  const ABI = [
    {
      inputs: [{ internalType: "uint256", name: "x", type: "uint256" }],
      name: "set",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "get",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];
  const SSaddress = "0xCbd43b4CF42101693689a1f9C201471d8f505E8f";

  const { config } = usePrepareContractWrite({
    address: SSaddress,
    abi: ABI,
    functionName: "set",
    args: [1],
  });
  const {
    data: dataWrite,
    write,
    isError: isErrorWrite,
    isLoading: isLoadingWrite,
    error,
  } = useContractWrite(config);

  const { isLoading: isLoadingResult, isSuccess } = useWaitForTransaction({
    hash: dataWrite?.hash,
  });

  return (
    <div>
      <button onClick={() => write?.()}> click</button>test
      {isLoadingWrite ? "loading" : null}
      {isErrorWrite ? "error" : null}
    </div>
  );
}
