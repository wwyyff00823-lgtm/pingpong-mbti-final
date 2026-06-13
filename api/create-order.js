const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, amount, description, type, mchId, mchKey } = req.body;
  
  const notifyUrl = `https://${req.headers.host}/api/verify-payment`;
  const returnUrl = `https://${req.headers.host}/?order=${orderId}`;

  const params = {
    mch_id: mchId,
    out_trade_no: orderId,
    total_fee: amount,
    body: description,
    notify_url: notifyUrl,
    return_url: returnUrl,
    nonce_str: crypto.randomBytes(16).toString('hex'),
    trade_type: type || 'NATIVE'
  };

  const sign = generateSign(params, mchKey);
  params.sign = sign;

  try {
    const response = await fetch('https://api.xunhupay.com/pay/unifiedorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    if (data.return_code === 'SUCCESS' && data.result_code === 'SUCCESS') {
      return res.status(200).json({
        success: true,
        payUrl: data.mweb_url || data.code_url,
        orderId: orderId
      });
    } else {
      return res.status(400).json({ error: data.return_msg || '支付创建失败' });
    }
  } catch (error) {
    return res.status(500).json({ error: '服务器错误' });
  }
}

function generateSign(params, key) {
  const sortedKeys = Object.keys(params).sort();
  let signStr = '';
  sortedKeys.forEach(k => {
    if (params[k] !== '' && k !== 'sign') {
      signStr += `${k}=${params[k]}&`;
    }
  });
  signStr += `key=${key}`;
  return crypto.createHash('md5').update(signStr).digest('hex').toUpperCase();
}