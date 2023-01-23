import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-filter-container",
  templateUrl: "./filter-container.component.html",
  styleUrls: ["./filter-container.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FilterContainerComponent implements OnInit {
  @Input() loading = false;
  @Input() filterClass: string;

  constructor() {}

  ngOnInit(): void {}
}
