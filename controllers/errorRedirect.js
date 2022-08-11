exports.all404Requests = (req, res, next) => {
    res.render('User/dashboard/404')
}

exports.error = (req, res, next) => {
    res.redirect('/user/school-settings')
}