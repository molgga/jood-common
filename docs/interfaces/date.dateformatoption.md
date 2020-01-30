[Doc](../README.md) › [Globals](../globals.md) › [date](../modules/date.md) › [DateFormatOption](date.dateformatoption.md)

# Interface: DateFormatOption

날짜 포맷 옵션

## Hierarchy

* **DateFormatOption**

## Index

### Properties

* [alternative](date.dateformatoption.md#optional-alternative)
* [format](date.dateformatoption.md#optional-format)
* [multiple](date.dateformatoption.md#optional-multiple)

## Properties

### `Optional` alternative

• **alternative**? : *string*

*Defined in [date/utils.ts:33](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/date/utils.ts#L33)*

at 정보가 invalid 할 때 대체 문자

___

### `Optional` format

• **format**? : *string*

*Defined in [date/utils.ts:23](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/date/utils.ts#L23)*

at 정보를 변경할 문자 포맷
YYYY: 년
MM: 월
DD: 일
AA: 오전|오후
hh: 시
mm: 분
ss: 초
(예: YYYY-MM-DD AA hh -> 2020-01-01 오전 12시)

___

### `Optional` multiple

• **multiple**? : *number*

*Defined in [date/utils.ts:28](https://github.com/molgga/jood-common/blob/16a3c52/projects/packages/date/utils.ts#L28)*

at 의 곱셈(at 정보를 unixtime 으로 다루는 경우 1000 을 옵션으로 지정)
