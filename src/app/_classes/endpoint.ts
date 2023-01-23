import { environment } from "./../../environments/environment";

const API_LIVE = "https://gateway.telkomuniversity.ac.id";
const API = environment.apiUrl;
const APP_CODE = environment.appCode;

export class Endpoint {
  getUrl(namespace: any, key: any, context: any) {
    const ENDPOINT = {
      oauth: {
        access_token: `${API}/issueauth`,
        user_profile: `${API}/issueprofile`,
        user_scope: `${API}/issuescope/${APP_CODE}`,
      },
      app: {
        faq: `${API}/fc95f9c89cc77a721dbd4048a7d72341/${APP_CODE}/${context}`,
      },
    };
    return ENDPOINT[namespace] && ENDPOINT[namespace][key];
  }
}
