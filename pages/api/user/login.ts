import { NextApiRequest, NextApiResponse } from 'next';
import { ServerErrorStatus } from 'types/error';
import { client_id, client_secret } from 'libs/consts';
import { setCookie, formatBody } from 'libs/service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, uid } = req.body;

  if (!code || !uid) {
    res.status(401).json({ success: false, err: ServerErrorStatus.InvalidAuthorization });
    return;
  }

  try {
    const data = await fetch(`https://openapi-testnet.ultiverse.io/api/v1/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formatBody({
        code,
        client_id,
        client_secret,
        grant_type: 'authorization_code'
      })
    }).then((res) => res.json());

    if (!data.accessToken || !data.refreshToken) {
      res.status(200).json({ success: false, err: data?.message || ServerErrorStatus.ServerError });
      return;
    }

    setCookie(res, 'Ultiverse_Demo_Authorization', `${data.refreshToken}******${uid}`, { maxAge: 24 * 3600 * 7 * 1000, path: '/', domain: process.env.USER_COOKIE_DOMAIN });
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log('Error', e);
    res.status(500).json({ success: false, err: ServerErrorStatus.ServerError });
  }
}
