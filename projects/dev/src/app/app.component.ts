import { Component } from "@angular/core";

import { JdString } from "dist/packages";
import { TTLCache } from "dist/packages/cache";
import { toWordArray, toMaskingFirst } from "dist/packages/string";
import { isNumber } from "dist/packages/number";
import { toFormat } from "dist/packages/date";

// import { JdString } from "@jood/common";
// import { toWordArray } from "@jood/common/string";
// import { isNumber } from "@jood/common/number";
// import { toFormat } from "@jood/common/date";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "dev";

  ngOnInit() {
    console.log("JdString", JdString);
    console.log("toWordArray", toWordArray("hello foo bar"));
    console.log("toMaskingFirst", toMaskingFirst("0123456789"));
    console.log("isNumber", isNumber(1));
    console.log("toFormat", toFormat(Date.now()));

    const ttl = new TTLCache();
    ttl.set("key1", { foo: "bar" }, 1000);
    console.log(ttl.get("key1"));
  }
}
