import { useEffect, useState } from "react";
import { Example } from "../contracts/Example";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "@ton/core";
import { toNano } from "@ton/core";

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Example(
      Address.parse("EQDzWN2flUoYMxpyCE7hAq7_JVhe5c92lI6yohHbPfn958R4") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Example>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val: any = await counterContract.getCounter();
      setVal(val.toString());
      await sleep(5000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [counterContract]);

  const increaseBy = Math.floor(Math.random() * 100);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrease(sender, {
        increaseBy,
        value: toNano("0.05"),
      });
    },
  };
}
