const request = require('request');
const { promisify, asForm } = require('./utils');

module.exports = (domain, key) => {
  const URL = `https://api:${key}@api.mailgun.net/v3/${domain}/templates`;

  const getTemplateByName = (name) =>
    promisify(request.get, `${URL}/${name}`);

  const modifyTemplateByName = ({ templateName, html }) =>
    promisify(
      request.put,
      // assuming only this script has been involved
      // otherwise, many more versions might exist
      `${URL}/${templateName}/versions/initial`,
      asForm({
        template: html,
      }),
    );

  const create = ({ templateName, html }) =>
    promisify(
      request.post,
      URL,
      asForm({
        name: templateName,
        description: 'Coming soon',
        template: html,
      }),
    );

  return async (template) => {
    const exists = await getTemplateByName(
      template.templateName,
    );

    return exists && exists.body && exists.body.template
      ? create(template)
      : modifyTemplateByName(template);
  };
};
