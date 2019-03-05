import axios from "axios";
const API_URL =
  "https://circleci.com/api/v1.1/project/github/stevenmburns/circleci-test";

export class APIService {
  constructor() {}
  getLatestArtifacts() {
    const url = API_URL + "/latest/artifacts";

    return axios.get(url);
  }
  getURL(url) {
    return axios.get(url);
  }
}
