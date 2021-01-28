const { notEmpty } = require('../utils')

module.exports = {
  description: `generate vue component`,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
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
          return 'Components 最少需要有一个script标签和template标签'
        } else {
          return true
        }
      }
    }
  ],
  actions: data => {
    const name = '{{ properCase name }}'
    return [
      {
        type: 'add',
        path: `src/components/${name}/index.vue`,
        templateFile: 'plop-templates/component/index.hbs',
        data: {
          name: name,
          template: data.blocks.includes('template'),
          script: data.blocks.includes('script'),
          style: data.blocks.includes('style')
        }
      }
    ]
  }
}
