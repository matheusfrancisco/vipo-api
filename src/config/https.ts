import Axios from "axios";
import envs from "@config/environment";

const REQUEST_TIMEOUT = 25000;
const TIMEOUT_MESSAGE = "Request timeouted";

const instance = Axios.create({
  baseURL: envs.API_R2D2,
  timeout: REQUEST_TIMEOUT,
  timeoutErrorMessage: TIMEOUT_MESSAGE
});

export const PATHS = {
  RECOMMENDATIONS: {
    CREATE: "/v1/recommendations"
  }
};

const Http = {
  instance,
  PATHS
};

export default Http;
