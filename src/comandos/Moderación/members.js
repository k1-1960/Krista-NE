const {
  EmbedBuilder,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: {
    name: 'moderacion',
    name_localizations: {
      'en-US': 'moderation',
      'es-ES': 'moderacion'
    },
    description: 'Comandos de moderación.',
    description_localizations: {
      'es-ES': 'Comandos de moderación.',
      'en-US': 'Moderation commands.'
    },
    dm_permission: false,
    options: [{
      type: 1,
      name: 'kick',
      name_localizations: {
        'es-ES': 'expulsar',
        'en-US': 'kick'
      },
      description: 'Expulsa un miembro del servidor.',
      description_localizations: {
        'en-US': 'Ejects a member from the server.',
        'es-ES': 'Expulsa a un miembro del servidor.'
      },
      options: [{
        type: 6,
        name: 'usuario',
        name_localizations: {
          'es-ES': 'usuario',
          'en-US': 'user'
        },
        description: 'Usuario que desea expulsar del servidor.',
        description_localizations: {
          'en-US': 'User you want to kick from the server.',
          'es-ES': 'Usuario que desea expulsar del servidor.'
        },
        required: true
      },
        {
          type: 3,
          name: 'razon',
          name_localizations: {
            'es-ES': 'razon',
            'en-US': 'reason'
          },
          description: 'Motivo de la expulsión ("No se da ningún motivo" si no se da uno).',
          description_localizations: {
            'es-ES': 'Motivo de la expulsión ("No se da ningún motivo" si no se da uno).',
            'en-US': 'Reason for expulsion ("No reason given" if one is not given).'
          },
          required: false
        }]
    }, {
      type: 1,
      name: 'ban',
      name_localizations: {
        'es-ES': 'ban',
        'en-US': 'ban'
      },
      description: 'Prohíbe a un usuario del servidor.',
      description_localizations: {
        'en-US': 'Bans a user from the server.',
        'es-ES': 'Prohíbe a un usuario del servidor.'
      },
      options: [{
        type: 6,
        name: 'usuario',
        name_localizations: {
          'es-ES': 'usuario',
          'en-US': 'user'
        },
        description: 'Usuario que desea banear.',
        description_localizations: {
          'en-US': 'User you want to ban.',
          'es-ES': 'Usuario que desea banear.'
        },
        required: true
      }, {
        type: 3,
        name: 'razon',
        name_localizations: {
          'es-ES': 'razon',
          'en-US': 'reason'
        },
        description: 'Motivo de la prohibición ("No se ha dado ningún motivo" si no se ha dado ningún motivo).',
        description_localizations: {
          'en-US': 'Reason for ban ("No reason given" if no reason given).',
          'es-ES': 'Motivo de la prohibición ("No se ha dado ningún motivo" si no se ha dado ningún motivo).'
        },
        required: false
      }]
    }]
  }
};