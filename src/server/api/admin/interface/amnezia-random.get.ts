import { generateAmneziaDefaults } from '@@/server/utils/amneziaDefaults';

export default definePermissionEventHandler('admin', 'any', async () => {
  const defaults = generateAmneziaDefaults();
  return defaults;
});
