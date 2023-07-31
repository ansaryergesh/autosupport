import { generateLocales } from '../../scripts/generateLocales.js';

export default function viteMissingLocales(path = 'src/locales') {
  return {
    name: 'generate-locales/vite',
    configureServer(server) {
      server.watcher.on('change', (id) => {
        if (id.startsWith(path)) {
          server.config.logger.info('Locales has been changed, generate new locales', {
            clear: true,
            timestamp: true,
          });
          generateLocales();
          console.info('Locales has been changed: ', id);
        }
      });
    },
  };
}
