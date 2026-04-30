exports.handler = async function (event) {
  const order = JSON.parse(event.body);

  const storeEmail = "madbrand@gmail.com";
  const recipients = order.email ? [order.email, storeEmail] : [storeEmail];

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #ead7c2;">
        <strong>${item.name}</strong><br>
        <span style="color:#6f5c4f;font-size:14px;">
          ${item.customizations?.length ? item.customizations.join(" • ") : "No customizations"}
        </span>
      </td>
      <td style="padding:12px;border-bottom:1px solid #ead7c2;text-align:center;">
        ${item.quantity || 1}
      </td>
      <td style="padding:12px;border-bottom:1px solid #ead7c2;text-align:right;">
        $${Number(item.finalPrice || 0).toFixed(2)}
      </td>
    </tr>
  `).join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "BagelsRUs <orders@mail.bagelsrusnc.com>",
      to: recipients,
      subject: `Bagels'R'us Order ${order.orderNumber}`,
      html: `
        <div style="margin:0;padding:0;background:#f7f1e8;font-family:Arial,sans-serif;color:#22140b;">
          <div style="max-width:680px;margin:0 auto;padding:28px;">
            <div style="background:#8b4c00;color:white;padding:24px;border-radius:18px 18px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:30px;">Bagels'R'us</h1>
              <p style="margin:8px 0 0;font-size:16px;">Fresh order confirmation</p>
            </div>

            <div style="background:white;padding:26px;border-radius:0 0 18px 18px;border:1px solid #ead7c2;">
              <h2 style="margin-top:0;color:#5d2f05;">Order ${order.orderNumber}</h2>

              <div style="background:#fff8ef;border:1px solid #ead7c2;border-radius:14px;padding:16px;margin-bottom:20px;">
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email || "N/A"}</p>
                <p><strong>Phone:</strong> ${order.phone || "N/A"}</p>
                <p><strong>Order Type:</strong> ${order.orderType}</p>
                <p><strong>Address:</strong> ${order.deliveryAddress || "N/A"}</p>
                <p><strong>Notes:</strong> ${order.notes || "None"}</p>
              </div>

              <h3 style="color:#5d2f05;">Items</h3>

              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#f3e6d7;">
                    <th style="padding:12px;text-align:left;">Item</th>
                    <th style="padding:12px;text-align:center;">Qty</th>
                    <th style="padding:12px;text-align:right;">Each</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="margin-top:22px;border-top:2px solid #ead7c2;padding-top:16px;">
                <p style="display:flex;justify-content:space-between;">
                  <span>Subtotal:</span>
                  <strong>$${Number(order.subtotal).toFixed(2)}</strong>
                </p>
                <p style="display:flex;justify-content:space-between;">
                  <span>Tax:</span>
                  <strong>$${Number(order.tax).toFixed(2)}</strong>
                </p>
                <p style="display:flex;justify-content:space-between;font-size:20px;color:#5d2f05;">
                  <span>Total:</span>
                  <strong>$${Number(order.total).toFixed(2)}</strong>
                </p>
              </div>

              <p style="margin-top:26px;color:#6f5c4f;font-size:14px;text-align:center;">
                Thank you for ordering from Bagels'R'us!
              </p>
            </div>
          </div>
        </div>
      `
    })
  });

  const data = await res.json();

  console.log("Resend status:", res.status);
  console.log("Resend response:", data);

  return {
    statusCode: res.ok ? 200 : 400,
    body: JSON.stringify(data)
  };
};
