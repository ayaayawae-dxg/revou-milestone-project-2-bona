import { Dayjs } from "dayjs";

interface DRegistration {
  firstName: string;
  email: string;
  birthDate: Dayjs;
  streetAddress: string;
  state: string;
  city: string;
  zipCode: string;
  username: string;
  password: string;
  rePassword: string;
};