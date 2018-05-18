const Font = require('../models/font.model');

module.exports = function (router) {
  /** Fonts view */
  router.get('/fonts', function (req, res) {
    let query = req.query || {};

    Font.findAll(query)
      .then(fonts => {
        res.render('fonts', {fonts: fonts, user: req.user});
      })
      .catch(err => {
        console.log(err);
      });
  });

  /** Like font handler */
  router.put('/fonts/:id/like', function (req, res) {
    let id = req.params.id;

    Font.findById(id)
      .then(font => {
        font.like();
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return router;
};


