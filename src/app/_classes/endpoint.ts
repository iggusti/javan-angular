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
      api_from_other_apps: {
        get_position: `${API}/3dc0984f96abc8947f046c225c87e47e/${context}`,
        get_worklocation: `${API}/64d4f7003b9cc79b015f2abad3be857d/${context}`,
        get_employee: `${API}/77a5b48a29591d1639eb4d02ed7fc07b/${context}`,
        get_employees_or_students: `${API}/1fd2d211f9b210372a96a0180f3f4a1f/${context}`,
        get_employee_structural_position: `${API}/1765f47fdeda02f2e2a42b5476b4dd1c/${context}`,
        get_position_aktif_per_unit: `${API}/5482a2fff64a2a8dd7cf9ade17ff16f4/${context}`,
      },
    };
    return ENDPOINT[namespace] && ENDPOINT[namespace][key];
  }
}
