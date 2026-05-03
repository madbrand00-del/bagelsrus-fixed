exports.handler = async function (event) {
  const order = JSON.parse(event.body);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "BagelsRUs <orders@mail.bagelsrusnc.com>",
      to: [order.email],
      subject: `Your Bagels'R'us Order ${order.orderNumber} Is Ready`,
      html: `
        <div style="margin:0;padding:0;background:#f7f1e8;font-family:Arial,sans-serif;color:#22140b;">
          <div style="max-width:640px;margin:0 auto;padding:28px;">
            <div style="background:#23764d;color:white;padding:24px;border-radius:18px 18px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:30px;">Order Ready!</h1>
              <p style="margin:8px 0 0;font-size:16px;">Bagels'R'us</p>
            </div>

            <div style="background:white;padding:26px;border-radius:0 0 18px 18px;border:1px solid #ead7c2;text-align:center;">
              <h2 style="margin-top:0;color:#23764d;">Hi ${order.name}, your order is ready.</h2>
              <p style="font-size:18px;">Order <strong>${order.orderNumber}</strong> is ready for pickup.</p>
              <p style="color:#6f5c4f;">Thank you for ordering from Bagels'R'us!</p>
            </div>
          </div>
        </div>
      `
    })
  });

  const data = await res.json();

  return {
    statusCode: res.ok ? 200 : 400,
    body: JSON.stringify(data)
  };
};