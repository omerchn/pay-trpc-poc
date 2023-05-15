export type OrderBy<RowT extends Record<string, unknown>> = Partial<{
  [key in keyof RowT]: 'ASC' | 'DESC'
}>

export type FilterParams<RowT extends Record<string, unknown>> = {
  and?: Array<FilterParams<RowT>>
  between?: Partial<{
    [key in keyof RowT]: {
      start: string
      end: string
    }
  }>
  equal?: Partial<RowT>
  exists?: never // todo
  greater?: Partial<RowT>
  greaterOrEquals?: Partial<RowT>
  iLike?: Partial<RowT>
  in?: Partial<{
    [key in keyof RowT]: { items: Array<NonNullable<string>> }
  }>
  inArrayExists?: never // todo
  less?: Partial<RowT>
  lessOrEquals?: Partial<RowT>
  like?: Partial<RowT>
  notBetween?: Partial<{
    [key in keyof RowT]: {
      start: string
      end: string
    }
  }>
  notEqual?: Partial<RowT>
  notIn?: Partial<{
    [key in keyof RowT]: { items: Array<NonNullable<string>> }
  }>
  notLike?: Partial<RowT>
  or?: Array<FilterParams<RowT>>
  textSearchCaseInsensitive?: Partial<RowT>
  textSearchCaseSensitive?: Partial<RowT>
}

export type FindByParamsFn = ({
  selectParams,
  filterParams,
  aggregateParams,
  page,
  limit,
  orderBy,
  getTotal,
  table
}: {
  selectParams: string[]
  filterParams?: {
    equal: { [index: string]: string }
    notEqual: { [index: string]: string }
    between: { [index: string]: { start: string; end: string } }
    notBetween: { [index: string]: { start: string; end: string } }
    in: { [index: string]: { items: string[] } }
    notIn: { [index: string]: { items: string[] } }
    less: { [index: string]: string }
    greater: { [index: string]: string }
    lessOrEquals: { [index: string]: string }
    greaterOrEquals: { [index: string]: string }
    like: { [index: string]: string }
    notLike: { [index: string]: string }
    iLike: { [index: string]: string }
    or: any[]
    and: any[]
    inArrayExists: { [index: string]: string }
    textSearchCaseSensitive: { [index: string]: string }
    textSearchCaseInsensitive: { [index: string]: string }
    exists: string[]
  }
  aggregateParams?: {
    aggregateFunctions?: {
      count: string[]
      avg: string[]
      sum: string[]
      max: string[]
      anyLast: string[]
      min: string[]
    }
    groupBy: string[]
  }
  page?: number
  limit?: number
  orderBy: { [index: string]: string }
  getTotal?: boolean
  table?: string
}) => Promise<{
  rows: ArrayBuffer
  page: number
  isLastPage: boolean
  total?: number
}>

export type FindByParamsTSFn<RowT extends Record<string, unknown>> = ({
  selectParams,
  filterParams,
  aggregateParams,
  page,
  limit,
  orderBy,
  getTotal,
  table
}: {
  selectParams: string[]
  filterParams?: FilterParams<RowT>
  aggregateParams?: {
    aggregateFunctions?: {
      count: string[]
      avg: string[]
      sum: string[]
      max: string[]
      anyLast: string[]
      min: string[]
    }
    groupBy: string[]
  }
  page?: number
  limit?: number
  orderBy: OrderBy<RowT>
  getTotal?: boolean
  table?: string
}) => Promise<{
  rows: Array<RowT>
  page: number
  isLastPage: boolean
  total?: number
}>
