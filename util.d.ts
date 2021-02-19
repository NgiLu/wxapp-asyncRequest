type IAnyObject = Record<string, any>

interface SuccessResult {
  data: string | IAnyObject | ArrayBuffer
  header: IAnyObject
  statusCode: number
  errMsg: string
}

interface FailResult extends SuccessResult {
  data: {
    message: string
  }
}

interface CompleteResult {
  data: string | IAnyObject | ArrayBuffer
  header: IAnyObject
  statusCode: number
  errMsg: string
}

export interface RequestOption {
  success?: (result: IAnyObject) => void
  fail?: (result: FailResult) => void
  complete?: (result: CompleteResult) => void,
  hiddenLoading?: boolean,
  showErr?: boolean
}

export interface FullRequestOption extends RequestOption {
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  data?: string | IAnyObject | ArrayBuffer
  pathParams?: IAnyObject,
  queryParams?: IAnyObject,
}

/**
 * 通用请求函数
 *
 * @param {string} url 
 * @param {FullRequestOption} [options] 
 * @returns {Promise<T>} 
 */
declare function asyncRequest<T>(url: string, options?: FullRequestOption): Promise<T>


export { asyncRequest }

export as namespace asyncRequest;