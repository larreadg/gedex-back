class Response {
    constructor(code, data, status) {
        this.status = status;
        this.code = code;
        this.data = data;
    }
}

module.exports = Response;