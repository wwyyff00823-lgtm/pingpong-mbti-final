import { paidOrders } from './verify-payment';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const orderId = req.query.orderId;
  if (!orderId) {
    return res.status(400).json({ error: '缺少订单号' });
  }

  const isPaid = paidOrders.has(orderId);
  return res.status(200).json({ paid: isPaid });
}