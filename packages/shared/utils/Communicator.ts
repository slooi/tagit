import Communicator from "../libs/Communicator";
import { Payload } from "./MediaHelper";

export const communicator = Communicator.getInstance<Payload>()
