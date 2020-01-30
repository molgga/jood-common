[Doc](../README.md) › [Globals](../globals.md) › [array](array.md)

# External module: array

## Index

### Functions

* [availableOr](array.md#availableor)
* [insert](array.md#insert)

## Functions

###  availableOr

▸ **availableOr**(`available`: any[], `value`: any, `or`: any): *any*

Defined in array/utils.ts:12

지정된 avaliable 에 value 가 포함되는 경우 value 를, 그렇지 않은 경우 or 값을 반환

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`available` | any[] | [] | 유효한 값들 |
`value` | any | - | 검사할 값 |
`or` | any | null | 검사할 값이 유효한 값에 포함되지 않을 경우 대체 값  |

**Returns:** *any*

___

###  insert

▸ **insert**(`ref`: any[], `index`: number, `value`: any): *any[]*

Defined in array/utils.ts:26

지정된 ref 배열에 index 에 value 를 삽입.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ref` | any[] | - | 값이 삽입될 소스 배열 |
`index` | number | -1 | 삽입될 인덱스 |
`value` | any | - | 삽입될 값  |

**Returns:** *any[]*
