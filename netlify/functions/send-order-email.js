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
      to: ["YOUR_EMAIL_HERE@gmail.com"],
      subject: `New Order ${order.orderNumber}`,
      html: `
        <h2>New Order ${order.orderNumber}</h2>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Order Type:</strong> ${order.orderType}</p>
        <p><strong>Address:</strong> ${order.deliveryAddress || "N/A"}</p>
        <p><strong>Notes:</strong> ${order.notes || "None"}</p>
        <h3>Items</h3>
        <ul>
          ${order.items.map(item => `
            <li>
              ${item.name} x${item.quantity || 1}
              ${item.customizations?.length ? `<br>${item.customizations.join(" • ")}` : ""}
            </li>
          `).join("")}
        </ul>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      `
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return { statusCode: 400, body: JSON.stringify(data) };
  }

  return { statusCode: 200, body: JSON.stringify(data) };
};