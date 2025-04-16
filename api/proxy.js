export default async function handler(req, res) {
  const targetUrl = `https://stealthchat.onrender.com${req.url}`;
  
  const fetchOptions = {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'https://stealthchat.onrender.com'
    },
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body
  };

  const response = await fetch(targetUrl, fetchOptions);
  const data = await response.arrayBuffer();

  res.status(response.status);
  response.headers.forEach((val, key) => {
    res.setHeader(key, val);
  });
  res.send(Buffer.from(data));
}
