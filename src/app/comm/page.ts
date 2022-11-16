/**
 * 分页数据封装
 */
export class Page<T> {
  count: number;
  rows: T[];
  static build<T>(rows: T[], count: number): Page<T> {
    const page = new Page<T>();
    page.rows = rows;
    page.count = count;
    return page;
  }
}
