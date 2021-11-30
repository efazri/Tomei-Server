class Response {
  constructor(res) {
    this.res = res;
    this.statusBadRequest = 400;
    this.statusInternalServerError = 500;
    this.statusForbidden = 403;
    this.statusNotFound = 404;
    this.statusUnprocessableEntity = 422;
    this.statusOk = 200;
    this.statusCreated = 201;
  }

  contentSuccess(code, response) {
    this.res.status(code).json({
      code,
      response,
    });
  }

  contentFail(code, errorMessage) {
    this.res.status(code).json({
      code,
      error: {
        message: errorMessage,
      },
    });
  }

  systemError(stack) {
    this.res.status(500).json({
      code: 500,
      error: {
        error_code: 'GE001',
        message: 'System error',
      },
      stack: process.env.NODE_ENV === 'development' ? stack : undefined,
    });
  }

  apiNotFound() {
    this.res.status(404).json({
      code: 404,
      error: {
        error_code: 'GE002',
        message: 'API not found',
      },
    });
  }

  contentSuccessDownloadable(code, fileName, datas) {
    this.res.setHeader('Content-disposition', `attachment;filename=${fileName}.csv`);
    this.res.set('Content-Type', 'text/csv');
    this.res.status(code).send(datas);
  }
}

module.exports = Response;
