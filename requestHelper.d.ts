declare class RequestHelper {

    /** 工具类构造器 */
    static Builder(): RequestHelper

    /** 设置请求地址 */
    requestUrl(url: string): RequestHelper

    /** 请求方法 */
    method(method: string): RequestHelper

    /** 提交数据 */
    postData(data: any): RequestHelper

    /** 路径参数 */
    pathParams(params: any): RequestHelper

    /** 查询参数 */
    queryParams(params: any): RequestHelper

    /** 额外配置 */
    option(option: any): RequestHelper

    /** 开始请求 */
    request(): Promise<any>
}

export default RequestHelper