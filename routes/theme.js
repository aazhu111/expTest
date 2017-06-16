module.exports = function (router) {
router.get('/themes', function(req, res, next) {
  res.json('respond with a resource');
});

}
