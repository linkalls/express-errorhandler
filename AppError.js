class AppError extends Error {
  constructor(message, status) {
    super() //* 親クラスのconstructor呼び出し
    this.message = message
    this.status = status
  }
}

module.exports = AppError
