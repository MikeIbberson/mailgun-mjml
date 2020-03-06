const request = require('request');
const { promisify, asForm } = require('./utils');

const VERSION = 'mjml';

module.exports = (domain, key) => {
  const URL = `https://api:${key}@api.mailgun.net/v3/${domain}/templates`;

  const getTemplateByName = (name) =>
    promisify(request.get, `${URL}/${name}`);

  const modifyTemplateByName = ({ templateName, html }) =>
    promisify(
      request.put,
      // assuming only this script has been involved
      // otherwise, many more versions might exist
      `${URL}/${templateName}/versions/${VERSION}`,
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
        description: 'Uploaded via API',
        template: html,
        tag: VERSION,
      }),
    );

  return async (template) => {
    const exists = await getTemplateByName(
      template.templateName,
    );

    const checkBody =
      exists &&
      exists.body &&
      JSON.parse(exists.body).template;

    return checkBody
      ? modifyTemplateByName(template)
      : create(template);
  };
};
