const { notEmpty } = require('../utils')

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks',
      choices: [
        {
          name: 'template tag',
          value: 'template',
          checked: true
        },
        {
          name: 'script tag',
          value: 'script',
          checked: true
        },
        {
          name: 'style tag',
          value: 'style',
          checked: false
        }
      ],
      validate(value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return 'View 最少需要有一个script标签和template标签'
        } else {
          return true
        }
      }
    }
  ],
  actions: data => {
    const name = '{{name}}'
    return [{
      type: 'add',
      path: `src/views/${name}.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]
  }
}
