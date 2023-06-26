import { setup, logoutWallet } from './ejs';
import { UserInfo } from './ejs'
import { getRequest } from '../request';
import { client_id, client_key, test_chain_id } from 'libs/consts';

export interface UserInfoResponse {
  success: boolean;
  data: UserInfo | null;
  err: string;
}

const init = () => {
  setup({
    project_id: '1c8416fe-4d88-47ea-ab69-3022cc7fef8e',
    app_id: '66e46b98-5ce4-4bcd-a935-a1cc0eca9345',
    client_key,
    client_id,
    state: 'auth-demo',
    chain_id: test_chain_id,
    env: 'development'
  });
}

init();

export const fetchUserInfo = async () => {
  const request = getRequest();
  const { data } = (await request.post('/api/user/info').catch(() => ({ success: false, data: null })) as UserInfoResponse);

  return data;
}

export const loginByCode = async () => {
  const request = getRequest();

  if (window.ultiverse_auth_info?.user_info) {
    const res = (await request.post('/api/user/login', window.ultiverse_auth_info?.user_info).catch(() => ({ success: false, data: null })) as { success: boolean });
    return res;
  }

  return { success: true };
}

export const logoutAccount = async () => {
  const request = getRequest();

  const res = (await request.post('/api/user/logout').catch(() => ({ success: false, data: null })) as { success: boolean });
  await logoutWallet();

  window.ultiverse_auth_info = undefined;

  return res;
}
