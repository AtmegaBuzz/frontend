import { atom } from "jotai";
import { ContractTokenData } from "./utils/interfaces";


export const tokenDataAtom = atom<ContractTokenData | null>(null);