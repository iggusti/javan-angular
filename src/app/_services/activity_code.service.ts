import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ActivityCodeService extends BaseService {
  private namespace = "activity_code";

  constructor(http: HttpClient) {
    super(http);
  }

  postActivity(body): Observable<any> {
    const url = this.getUrl(this.namespace, "create_activity_code");
    return this.postApiPlain(url, body);
  }

  getActivity(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_activity_code", context);
    return this.getApi(url);
  }

  updateActivity(body, context): Observable<any> {
    const url = this.getUrl(this.namespace, "update_activity_code", context);
    return this.putApi(url, body);
  }

  deteleActivity(context): Observable<any> {
    const url = this.getUrl(this.namespace, "delete_activity_code", context);
    return this.delApi(url); //
  }

  activateActivity(context): Observable<any> {
    const url = this.getUrl(this.namespace, "activate_activity_code", context);
    return this.putApi(url);
  }
}
