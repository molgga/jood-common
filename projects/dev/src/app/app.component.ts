import { Component } from "@angular/core";

// import { JdString } from "dist/packages";
// import { toWordArray } from "dist/packages/string";
// import { isStrictNumber } from "dist/packages/number";
import { JdString } from "@jood/common";
import { toWordArray } from "@jood/common/string";
import { isNumber } from "@jood/common/number";
import { toFormat } from "@jood/common/date";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "dev";

  ngOnInit() {
    console.log("JdString", JdString);
    console.log("toWordArray", toWordArray("hello foo bar"));
    console.log("isNumber", isNumber(1));
    console.log("toFormat", toFormat(Date.now()));
  }
}
