import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ExternalPartnerService extends BaseService {
  private namespace = "external_partner";

  constructor(http: HttpClient) {
    super(http);
  }

  postExternalPartner(body): Observable<any> {
    const url = this.getUrl(this.namespace, "create_external_partner");
    return this.postApiPlain(url, body);
  }

  getExternalPartner(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_external_partner", context);
    return this.getApi(url);
  }

  updateExternalPartner(body, context): Observable<any> {
    const url = this.getUrl(this.namespace, "update_external_partner", context);
    return this.putApi(url, body);
  }

  deteleExternalPartner(context): Observable<any> {
    const url = this.getUrl(this.namespace, "delete_external_partner", context);
    return this.delApi(url);
  }

  activateExternalPartner(context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "activate_external_partner",
      context
    );
    return this.putApi(url);
  }

  getCountries(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_country", context);
    return this.getApi(url);
  }

  getProvinces(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_province", context);
    return this.getApi(url);
  }

  getCitys(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_city", context);
    return this.getApi(url);
  }

  getLawStatus(): Observable<any> {
    const url = this.getUrl(this.namespace, "get_law_status");
    return this.getApi(url);
  }
}
