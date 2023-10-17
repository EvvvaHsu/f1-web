module.exports = {
  generalErrorHandler: async (err, req, res, next) => {
    try {
      if (err instanceof Error) {
        req.flash('error_messages', `${err.name}: ${err.message}`)
      } else {
        req.flash('error_messages', `${err}`)
      }
      res.redirect('back')
      next(err)
    } catch (err) {
      next(err)
    }
  }
}
