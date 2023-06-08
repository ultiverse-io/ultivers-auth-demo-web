import { NextApiRequest, NextApiResponse } from 'next';
import { ServerErrorStatus } from 'types/error';
import { client_id, client_secret } from 'libs/consts';
import { setCookie, formatBody } from 'libs/service';

export type SignResponse = {
  success: true;
  data: {
    message: string;
  };
} | {
  success: false;
  err: ServerErrorStatus;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignResponse>
) {
  const [refresh_token, uid] = (req.cookies['Ultiverse_Demo_Authorization'] || '').split('******');

  if (!refresh_token || !uid) {
    res.status(401).json({ success: false, err: ServerErrorStatus.InvalidAuthorization });
    return;
  }

  const refershRes = await fetch(`https://openapi-testnet.ultiverse.io/api/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formatBody({
      refresh_token,
      client_id,
      client_secret,
      grant_type: 'refresh_token'
    })
  }).then((res) => res.json());

  if (!refershRes.accessToken || !refershRes.refreshToken) {
    res.status(401).json({ success: false, err: ServerErrorStatus.InvalidAuthorization });
    return;
  }

  try {
    const [data, wallets] = await Promise.all([
      fetch(`https://openapi-testnet.ultiverse.io/api/v1/users/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refershRes.accessToken}`
        }
      }).then((res) => res.json()),
      fetch(`https://openapi-testnet.ultiverse.io/api/v1/users/${uid}/wallets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refershRes.accessToken}`
        },
      }).then((res) => res.json())
    ]);

    if (!data?.id || !wallets?.assetWallets) {
      res.status(200).json({ success: false, err: data?.message || ServerErrorStatus.ServerError });
      return;
    }

    setCookie(res, 'Ultiverse_Demo_Authorization', `${refershRes.refreshToken}******${uid}`, { maxAge: 24 * 3600 * 7 * 1000, path: '/', domain: process.env.USER_COOKIE_DOMAIN });
    res.status(200).json({ success: true, data: { ...(data || {}), wallets } });
  } catch (e) {
    console.log('Error', e);
    res.status(500).json({ success: false, err: ServerErrorStatus.ServerError });
  }
}
