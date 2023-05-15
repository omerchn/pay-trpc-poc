import { z } from 'zod'
import { FilterParams, OrderBy } from './types'

export const useFindByParamsProcedure = <
  FindByParamsFn extends (input: any) => Promise<{
    rows: ArrayBuffer
    page: number
    isLastPage: boolean
    total?: number | null
  }>,
  GetOneFn extends (input: any) => Promise<Record<string, unknown>>,
  Select extends Array<keyof Awaited<ReturnType<GetOneFn>>>
>({
  select
}: {
  findByParamsFn: FindByParamsFn
  getOneFn: GetOneFn
  select: Select
}) => {
  type Row = Awaited<ReturnType<GetOneFn>>

  type ProcedureInput = Omit<
    FindByParamsInput,
    'orderBy' | 'filterParams' | 'selectParams'
  > & {
    filterParams?: FilterParams<Row>
    orderBy?: OrderBy<Row>
  }
  type FindByParamsInput = Parameters<FindByParamsFn>[0]

  type ProcedureOutput = Omit<Awaited<ReturnType<FindByParamsFn>>, 'rows'> & {
    rows: Array<Pick<Row, Select[number]>>
  }
  type FindByParamsOutput = Awaited<ReturnType<FindByParamsFn>>

  return {
    inputParser: {
      ...z.object({}),
      _input: {} as ProcedureInput,
      parse: (input: ProcedureInput) => ({ ...input, selectParams: select }),
      _output: {} as FindByParamsInput
    },
    outputParser: {
      ...z.object({}),
      _input: {} as FindByParamsOutput,
      parse: (output: FindByParamsOutput) => output as ProcedureOutput,
      _output: {} as ProcedureOutput
    }
  }
}
