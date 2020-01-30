[Doc](../README.md) › [Globals](../globals.md) › [date](date.md)

# External module: date

## Index

### Interfaces

* [DateFormatOption](../interfaces/date.dateformatoption.md)
* [DatePastOption](../interfaces/date.datepastoption.md)

### Functions

* [toFormat](date.md#toformat)
* [toPast](date.md#topast)

## Functions

###  toFormat

▸ **toFormat**(`at`: number, `options`: [DateFormatOption](../interfaces/date.dateformatoption.md)): *string*

*Defined in [date/utils.ts:41](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/date/utils.ts#L41)*

지정된 시간을 지정된 옵션의 포맷으로 변경

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`at` | number | - | 시간 |
`options` | [DateFormatOption](../interfaces/date.dateformatoption.md) | {} | 옵션  |

**Returns:** *string*

___

###  toPast

▸ **toPast**(`fromAt`: number, `pastAt`: number, `options`: [DatePastOption](../interfaces/date.datepastoption.md)): *string*

*Defined in [date/utils.ts:151](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/date/utils.ts#L151)*

pastAt 이 fromAt 으로 부터 지나간 시간을 지정된 옵션에 따라 반환.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`fromAt` | number | - | 기준 시간 |
`pastAt` | number | - | 비교할 시간 |
`options` | [DatePastOption](../interfaces/date.datepastoption.md) | {} | 옵션  |

**Returns:** *string*
