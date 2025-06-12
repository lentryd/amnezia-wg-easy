import en from './locales/en.json';
import uk from './locales/uk.json';
import fr from './locales/fr.json';
import ru from './locales/ru.json';

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    uk,
    fr,
    ru,
  },
}));
