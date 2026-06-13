const crypto = require('crypto');

let paidOrders = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const params = req.body;
  const sign = params.sign;
  delete params.sign;

  // 注意：生产环境应该从环境变量获取密钥，这里简化处理
  const mchKey = process.env.HUPIJIAO_KEY || req.body.mchKey;
  const calculatedSign = generateSign(params, mchKey);

  if (sign !== calculatedSign) {
    return res.status(400).send('签名验证失败');
  }

  if (params.return_code === 'SUCCESS' && params.result_code === 'SUCCESS') {
    const orderId = params.out_trade_no;
    paidOrders.add(orderId);
    // 订单24小时后过期
    setTimeout(() => {
      paidOrders.delete(orderId);
    }, 24 * 60 * 60 * 1000);
    
    return res.status(200).send('SUCCESS');
  } else {
    return res.status(400).send('支付失败');
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

export { paidOrders };