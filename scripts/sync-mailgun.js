const request = require('request');

module.exports = (domain, key) => {
  const URL = `https://api:${key}@api.mailgun.net/v3/${domain}/templates`;

  return {
    add: (templates = []) =>
      Promise.all(
        templates.map((template) => {
          request.get(`${URL}/sample.name`, (err, d) => {
            if (err) throw new Error(err);
            if (d.body) {
              request.put(
                `${URL}/sample.name/versions/initial`,
                {
                  form: {
                    template,
                  },
                },
                (error, response) => {
                  console.log('done!!');
                  if (error) throw new Error(error);
                  console.log(response.body);
                },
              );
            } else {
              request.post(
                URL,
                {
                  form: {
                    name: 'sample.name',
                    description: 'this is important',
                    template,
                  },
                },
                (error, response) => {
                  console.log('done!');
                  if (error) throw new Error(error);
                  console.log(response.body);
                },
              );
            }
          });
        }),
      ),
  };
};
