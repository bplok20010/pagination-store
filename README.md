# pagination-store

生成 pagination 数据对象

## 安装

`npm install --save pagination-store`

## types

```ts
interface PaginationOptions {
	total: number;
	current?: number;
	pageSize?: number;
	pageRange?: number;
}

interface PData {
	page: number | null;
	isCurrent?: boolean;
	isPreviousMore?: boolean;
	isNextMore?: boolean;
}
```

## PaginationStore

### 构造函数

`new PaginationStore({ total: 100, current: 1, pageSize: 10, pageRange: 5 })`
或
`getPageList({ total: 100, current: 1, pageSize: 10, pageRange: 5 }): PData[]`

### 属性

-   `total` 总数
-   `current` 当前页 默认为 1
-   `pageSize` 页码大小 默认为 10
-   `pageRange` 分页按钮显示的最大数 默认为 5

### 方法

-   `getCurrentList(): PData[]` 获取当前分页的列表。

    该方法接收一个函数作为结果項进行处理

-   `getPageTotal()` 获取页面总数
-   `isFirstPage(number)` 判断是否第一页
-   `isLastPage(number)` 作用同上
-   `getNext()` 获取下一页的页码，如果不存在则返回 null
-   `getPrevious()` 作用同上
-   `previous()` 翻页，上一页，如果失败则返回 false
-   `next()` 翻页，下一页，如果失败则返回 false

## getPageList

eg:
`getPageList({ total: 100, current: 1, pageSize: 10, pageRange: 5 })`

## 示例

```javascript
import { PaginationStore, getPageList } from "pagination-store";

const pagination = new PaginationStore({
	total: 161,
	pageSize: 10,
	pageRange: 5,
});

console.log(pagination.getCurrentList());

pagination.current = 8;

console.log(pagination.getCurrentList());

pagination.next();

console.log(pagination.getCurrentList());
```

```
//getCurrentList() 返回示例
[ { page: 1, isCurrent: false },
  { page: null, isPreviousMore: true },
  { page: 7, isCurrent: false },
  { page: 8, isCurrent: false },
  { page: 9, isCurrent: true },
  { page: 10, isCurrent: false },
  { page: 11, isCurrent: false },
  { page: null, isNextMore: true },
  { page: 17, isCurrent: false } ]
```
