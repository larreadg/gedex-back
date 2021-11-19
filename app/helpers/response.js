class Response {
    constructor(code, data, status, meta=null) {
        this.status = status;
        this.code = code;
        this.data = data;
        if(meta) this.meta = meta;
    }
}

module.exports = Response;