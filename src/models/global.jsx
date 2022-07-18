import { batchNotification } from '@/utils/notification';
import { isEmpty } from '@/utils/utils';

export const handleNotification = (response) => ({
  type: 'global/handleNotification',
  response,
});

export default {
  namespace: 'global',

  effects: {
    // eslint-disable-next-line require-yield
    *handleNotification({ response }) {
      const { errors, hideNotify } = response;
      if (isEmpty(errors)) {
        return;
      }
      // const allMessages = errors.concat(messages);
      const mess = errors?.message ? [{ message: errors?.message, level: 'error' }] : [{}];
      batchNotification(mess, hideNotify);
    },
  },
};
