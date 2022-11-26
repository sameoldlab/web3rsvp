import { c as create_ssr_component } from "../../chunks/index.js";
import { Interface, Contract, Wallet } from "fuels";
const _abi = [
  {
    type: "function",
    name: "counter",
    inputs: [],
    outputs: [
      {
        type: "u64",
        name: ""
      }
    ]
  },
  {
    type: "function",
    name: "increment",
    inputs: [
      {
        type: "u64",
        name: "param"
      }
    ],
    outputs: [
      {
        type: "u64",
        name: ""
      }
    ]
  }
];
class ContractAbi__factory {
  static abi = _abi;
  static createInterface() {
    return new Interface(_abi);
  }
  static connect(id, walletOrProvider) {
    return new Contract(id, _abi, walletOrProvider);
  }
}
const CONTRACT_ID = "0x61b572d1f08e9c07afcca90a765ecf5044dbcf5e5898784ea1de2731a9d91cb0";
const WALLET_SECRET = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const wallet = Wallet.fromPrivateKey(WALLET_SECRET);
  ContractAbi__factory.connect(CONTRACT_ID, wallet);
  return `${$$result.head += `<!-- HEAD_svelte-18jls0h_START -->${$$result.title = `<title>RSVP</title>`, ""}<!-- HEAD_svelte-18jls0h_END -->`, ""}

<div class="${"app"}"><button>click</button></div>`;
});
export {
  Page as default
};
