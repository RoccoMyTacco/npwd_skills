import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Skills',
};

interface Settings {
  language: 'en';
}

export default (settings: Settings) => ({
  id: 'skills',
  path: '/npwd_skills',
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#fc7f03',
  icon: AppIcon,
  app: App,
});
