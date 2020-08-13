/**
 * namespace string module
 * @namespace JdString
 * @example
 * import { JdString } from '@jood/common';
 * JdString.replaceAll(...);
 */
import * as JdString from "./public-api.string";

/**
 * namespace number module
 * @namespace JdNumber
 * @example
 * import { JdNumber } from '@jood/common';
 * JdNumber.isNumber(...);
 */
import * as JdNumber from "./public-api.number";

/**
 * namespace array module
 * @namespace JdArray
 * @example
 * import { JdArray } from '@jood/common';
 * JdArray.insert(...);
 */
import * as JdArray from "./public-api.array";

/**
 * namespace array module
 * @namespace JdDate
 * @example
 * import { JdDate } from '@jood/common';
 * JdDate.toFormat(...);
 */
import * as JdDate from "./public-api.date";

/**
 * namespace point module
 * @namespace JdPoint
 * @example
 * import { JdPoint } from '@jood/common';
 * JdPoint.intersect(...);
 */
import * as JdPoint from "./public-api.point";

export { JdString, JdNumber, JdArray, JdDate, JdPoint };
