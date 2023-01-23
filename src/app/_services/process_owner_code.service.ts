import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProcessOwnerCodeService extends BaseService {
  private namespace = "process_owner_code";

  constructor(http: HttpClient) {
    super(http);
  }

  postProcessOwnerCode(body): Observable<any> {
    const url = this.getUrl(this.namespace, "create_process_owner_code");
    return this.postApiPlain(url, body);
  }

  getProcessOwnerCode(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_process_owner_code", context);
    return this.getApi(url);
  }

  updateProcessOwnerCode(body, context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "update_process_owner_code",
      context
    );
    return this.putApi(url, body);
  }

  deteleProcessOwnerCode(context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "delete_process_owner_code",
      context
    );
    return this.delApi(url); //
  }

  activateProcessOwnerCode(context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "activate_process_owner_code",
      context
    );
    return this.putApi(url);
  }
}
