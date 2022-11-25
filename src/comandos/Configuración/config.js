module.exports.data = {
  name: 'config',
  name_localizations: {
    'es-ES': 'configuracion',
    'en-US': 'config'
  },
  description: 'Configura el bot a tu gusto.',
  description_localizations: {
    'es-ES': 'Configura el bot a tu gusto.',
    'en-US': 'Configure the bot to your liking.'
  },
  options: [{
    type: 1,
    name: 'language',
    name_localizations: {
      'es-ES': 'idioma',
      'en-US': 'language'
    },
    description: 'Elige un idioma disponible.',
    description_localizations: {
      'en-US': 'Choose an available language.',
      'es-ES': 'Elige un idioma disponible.'
    },
    options: [{
      type: 3,
      required: true,
      name: 'language',
      name_localizations: {
        'es-ES': 'idioma',
        'en-US': 'language'
      },
      description: 'Idioma a aplicar.',
      description_localizations: {
        'es-ES': 'Idioma a aplicar.',
        'en-US': 'Language to apply.'
      },
      choices: [{
        name: 'Español',
        name_localizations: {
          'en-US': 'Spanish',
          'es-ES': 'Español'
        },
        value: 'es-ES'
      }, {
        name: 'Inglés (EE.UU)',
        name_localizations: {
          'en-US': 'English (USA)',
          'es-ES': 'Inglés (EE.UU)'
        },
        value: 'en-US'
      }]
    }]
  }]
};