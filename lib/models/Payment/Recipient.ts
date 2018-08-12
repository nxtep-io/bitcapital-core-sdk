import { BaseModel, BaseModelSchema } from "..";
import Wallet from "../Wallet/Wallet";

export interface RecipientSchema extends BaseModelSchema {
  amount: string;
  destination: Wallet;
}

export default class Recipient extends BaseModel implements RecipientSchema {
  amount: string = undefined;
  destination: Wallet = undefined;

  constructor(data: Partial<RecipientSchema>) {
    super(data);

    // Assign all props
    Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
  }
}
