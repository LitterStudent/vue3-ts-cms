import hdRequest from '@/service'
import { IDataType } from '@/service/type'
export function getPageListData(url: string, queryInfo: any) {
  return hdRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
