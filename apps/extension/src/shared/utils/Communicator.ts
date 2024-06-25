import Communicator from "../libs/Communicator";
import Payload from "../payloads/payloads";

const communicator = Communicator.getInstance<Payload>()
export default communicator