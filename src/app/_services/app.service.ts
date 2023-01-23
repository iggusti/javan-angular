import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppService extends BaseService {
  private namespace = "app";

  constructor(http: HttpClient) {
    super(http);
  }

  getFakeDataKerjaSama(): Observable<any> {
    return this.getApi("fake-data/event/event-kerja-sama.json");
  }

  getFakeDataKemahasiswaan(): Observable<any> {
    return this.getApi("fake-data/event/event-kemahasiswaan.json");
  }

  getFakeDataAkademik(): Observable<any> {
    return this.getApi("fake-data/event/event-akademik.json");
  }

  getFakeData(): Observable<any> {
    return this.getApi("fake-data/datatable-data.json");
  }

  getFaqData(param): Observable<any> {
    const url = this.getUrl(this.namespace, "faq", this.dtParam(param));
    return this.getApi(url);
  }
}
