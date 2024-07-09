import Communicator from "../libs/Communicator";
import { Payload } from "./MediaHelper";

const communicator = Communicator.getInstance<Payload>()
export default communicator