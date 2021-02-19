import { asyncRequest } from './asyncRequest'

export default class RequestHelper {

    static Builder() {
        return new RequestHelper()
    }

    constructor() {
        this._option = {}
    }

    requestUrl(url) {
        this._requestUrl = url;
        return this;
    }

    method(method) {
        this._option.method = method
        return this
    }

    postData(data) {
        this._option.data = data
        return this
    }

    pathParams(params) {
        this._option.pathParams = params
        return this
    }

    queryParams(params) {
        this._option.queryParams = params
        return this
    }

    option(option) {
        this._option = Object.assign(this._option, option)
        return this
    }

    request() {
        return asyncRequest(this._requestUrl, this._option)
    }
}

