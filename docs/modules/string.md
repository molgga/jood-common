[Doc](../README.md) › [Globals](../globals.md) › [string](string.md)

# External module: string

## Index

### Interfaces

* [CurrencyPriceOption](../interfaces/string.currencypriceoption.md)

### Functions

* [insert](string.md#insert)
* [leadingTime](string.md#leadingtime)
* [padEnd](string.md#padend)
* [padStart](string.md#padstart)
* [refineSafeHtmlText](string.md#refinesafehtmltext)
* [removeTag](string.md#removetag)
* [replaceAll](string.md#replaceall)
* [toCamelFromKebab](string.md#tocamelfromkebab)
* [toCamelFromSnake](string.md#tocamelfromsnake)
* [toCurrencyFormat](string.md#tocurrencyformat)
* [toEllipsisEnd](string.md#toellipsisend)
* [toEllipsisMiddle](string.md#toellipsismiddle)
* [toUpperCaseHead](string.md#touppercasehead)
* [toWordArray](string.md#towordarray)

## Functions

###  insert

▸ **insert**(`text`: string, `index`: number, `addText`: string): *string*

*Defined in [string/utils.ts:90](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L90)*

지정된 인덱스에 문자를 삽입

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 소스 문자열 |
`index` | number | 삽입될 인덱스 |
`addText` | string | 삽입될 문자열  |

**Returns:** *string*

___

###  leadingTime

▸ **leadingTime**(`time`: string | number): *string*

*Defined in [string/utils.ts:165](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L165)*

지정된 시간 숫자 앞에 0을 채워야 하는 경우 0을 채움.
(예: 2 -> 02, 9 -> 09, 10 -> 10)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`time` | string &#124; number | 시간 표시용 숫자 | 문자  |

**Returns:** *string*

___

###  padEnd

▸ **padEnd**(`text`: string | number, `addText`: string, `expectCount`: number): *string*

*Defined in [string/utils.ts:139](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L139)*

문자열 우측에 지정된 갯 수 만큼 문자 삽입

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`text` | string &#124; number | - | 소스 문자열 |
`addText` | string | - | 추가될 문자열 |
`expectCount` | number | 1 | 합쳐진 문자열 수  |

**Returns:** *string*

___

###  padStart

▸ **padStart**(`text`: string | number, `addText`: string, `expectCount`: number): *string*

*Defined in [string/utils.ts:112](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L112)*

문자열 좌측에 지정된 갯 수 만큼 문자 삽입

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`text` | string &#124; number | - | 소스 문자열 |
`addText` | string | - | 추가될 문자열 |
`expectCount` | number | 1 | 합쳐진 문자열 수  |

**Returns:** *string*

___

###  refineSafeHtmlText

▸ **refineSafeHtmlText**(`source`: string): *string*

*Defined in [string/utils.ts:292](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L292)*

엔티티 코드로 변형된 html 을 태그 문자열로 변경
(예: &lt;&nbsp;1&amp;2&nbsp;&gt; -> < 1&2 >)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`source` | string | 소스 문자열  |

**Returns:** *string*

___

###  removeTag

▸ **removeTag**(`tagText`: string, `removeTabSpace`: boolean): *string*

*Defined in [string/utils.ts:29](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L29)*

태그 문자열에서 태그를 모두 제거

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`tagText` | string | - | 소스 문자열 |
`removeTabSpace` | boolean | true | 탭 문자를 제거할지 여부  |

**Returns:** *string*

___

###  replaceAll

▸ **replaceAll**(`text`: string, `find`: string, `replace`: string): *string*

*Defined in [string/utils.ts:14](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L14)*

일치하는 모든 문자를 변경

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`text` | string | - | 소스 문자열 |
`find` | string | - | 검색 문자열 |
`replace` | string | "" | 치환 문자열  |

**Returns:** *string*

___

###  toCamelFromKebab

▸ **toCamelFromKebab**(`text`: string): *string*

*Defined in [string/utils.ts:62](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L62)*

소스 문자열의 하이픈(-)을 카멜 케이스로 변경

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 소스 문자열  |

**Returns:** *string*

___

###  toCamelFromSnake

▸ **toCamelFromSnake**(`text`: string): *string*

*Defined in [string/utils.ts:52](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L52)*

소스 문자열의 언더바(_)를 카멜 케이스로 변경

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 소스 문자열  |

**Returns:** *string*

___

###  toCurrencyFormat

▸ **toCurrencyFormat**(`price`: string | number, `options`: [CurrencyPriceOption](../interfaces/string.currencypriceoption.md)): *string*

*Defined in [string/utils.ts:198](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L198)*

지정된 숫자(문자)를 가격 표시용 문자로 변경
(예: 1000 -> 1,000)

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`price` | string &#124; number | - | 가격 문자 | 숫자 |
`options` | [CurrencyPriceOption](../interfaces/string.currencypriceoption.md) | {} | 옵션  |

**Returns:** *string*

___

###  toEllipsisEnd

▸ **toEllipsisEnd**(`text`: string, `max`: number, `alternative`: string): *string*

*Defined in [string/utils.ts:268](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L268)*

지정된 소스 문자열이 기준 수를 넘어가면 마지막을 잘라내고 문자를 삽입.
(예: abcdefghijklmn -> abcd...)

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`text` | string | - | 소스 문자열 |
`max` | number | 50 | 잘라낼 기준 수 |
`alternative` | string | "..." | 잘라낸 문자열 마지막에 들어갈 문자열  |

**Returns:** *string*

___

###  toEllipsisMiddle

▸ **toEllipsisMiddle**(`text`: string, `max`: number, `alternative`: string): *string*

*Defined in [string/utils.ts:244](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L244)*

지정된 소스 문자열이 기준 수를 넘어가면 좌, 우로 잘라내고 사이에 대체 문자를 삽입.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`text` | string | - | 소스 문자열 |
`max` | number | 50 | 잘라낼 기준 수 |
`alternative` | string | "..." | 잘라낸 문자열 사이에 들어갈 문자열  |

**Returns:** *string*

___

###  toUpperCaseHead

▸ **toUpperCaseHead**(`text`: string): *string*

*Defined in [string/utils.ts:42](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L42)*

소스 문자열의 맨 앞 문자를 대문자로 변경

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 소스 문자열  |

**Returns:** *string*

___

###  toWordArray

▸ **toWordArray**(`text`: string): *string[]*

*Defined in [string/utils.ts:72](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/string/utils.ts#L72)*

소스 문자열을 단어 단위로 분리

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 소스 문자열  |

**Returns:** *string[]*
