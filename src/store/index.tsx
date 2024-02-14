import { DRegistration, DStore } from "database";
import { atom } from "recoil";

const registrationState = atom<DRegistration>({
  key: "registration",
});

const storeState = atom<DStore[]>({
  key: "store",
  default: [{
    key: crypto.randomUUID(),
    asset: "BTC",
    quantity: 3,
  },
  {
    key: crypto.randomUUID(),
    asset: "LAPTOP",
    quantity: 1,
  }],
});

const authState = atom({
  key: 'auth',
  default: JSON.parse(localStorage.getItem('user') as string),
});


export { registrationState, storeState, authState };
