const Joi = require("joi");

exports.getValidatePost = (req, res, next) => {
  let { error } = Joi.object()
    .keys({
      page: Joi.number().required(),
      limit: Joi.string(),
      search: Joi.string().optional(),
    })
    .validate(req.query);
  if (error) return errorM(res, error.details[0].message);
  next();
};

exports.addValidatePost = (req, res, next) => {
  let { error } = Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      _tag: Joi.string().required(),
    })
    .validate(req.body);

  if (error) return errorM(res, error.details[0].message);
  next();
};

exports.putValidatePost = (req, res, next) => {
  let { error } = Joi.object()
    .keys({
      postId: Joi.string().hex().required(),
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      image: Joi.string().optional(),
      _tag: Joi.array().items().required(),
    })
    .validate(req.body);

  if (error) return errorM(res, error.details[0].message);
  next();
};

exports.deleteValidatePost = (req, res, next) => {
  let { error } = Joi.object()
    .keys({
      postId: Joi.string().hex().required(),
    })
    .validate(req.body);

  if (error) return errorM(res, error.details[0].message);
  next();
};

function errorM(res, error) {
  return res.status(400).send({
    status: false,
    message: error,
    data: null,
  });
}
