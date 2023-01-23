import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TemplateService extends BaseService {
  private namespace = "template";

  constructor(http: HttpClient) {
    super(http);
  }

  postTemplateMaster(body): Observable<any> {
    const url = this.getUrl(this.namespace, "create_template_master");
    return this.postApiPlain(url, body);
  }

  getTemplateMaster(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_template_master", context);
    return this.getApi(url);
  }

  getTemplateMasterActive(context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "get_template_master_active",
      context
    );
    return this.getApi(url);
  }

  getTemplateMasterFlow(): Observable<any> {
    const url = this.getUrl(this.namespace, "get_template_master_flow");
    return this.getApi(url);
  }

  updateTemplateMaster(body, context): Observable<any> {
    const url = this.getUrl(this.namespace, "update_template_master", context);
    return this.putApi(url, body);
  }

  deleteTemplateMaster(context): Observable<any> {
    const url = this.getUrl(this.namespace, "delete_template_master", context);
    return this.delApi(url);
  }

  activateTemplateMaster(context): Observable<any> {
    const url = this.getUrl(
      this.namespace,
      "activate_template_master",
      context
    );
    return this.putApi(url);
  }

  postTemplateFlow(body): Observable<any> {
    const url = this.getUrl(this.namespace, "create_template_flow");
    return this.postApiPlain(url, body);
  }

  getTemplateFlow(context): Observable<any> {
    const url = this.getUrl(this.namespace, "get_template_flow", context);
    return this.getApi(url);
  }

  updateTemplateFlow(body): Observable<any> {
    const url = this.getUrl(this.namespace, "update_template_flow");
    return this.postApiPlain(url, body);
  }

  deleteTemplateFlow(context): Observable<any> {
    const url = this.getUrl(this.namespace, "delete_template_flow", context);
    return this.delApi(url);
  }
}
