exports.handler = async function (event) {
  console.log("Function hit");
  console.log("API key exists:", !!process.env.RESEND_API_KEY);

  const order = JSON.parse(event.body);

  const storeEmail = "madbrand@gmail.com";

  const recipients = order.email
    ? [order.email, storeEmail]
    : [storeEmail];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "BagelsRUs <orders@mail.bagelsrusnc.com>",
      to: recipients,
      subject: `New Order ${order.orderNumber}`,
      html: `
        <h2>New Order ${order.orderNumber}</h2>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${order.phone || "N/A"}</p>
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

        <p><strong>Subtotal:</strong> $${Number(order.subtotal).toFixed(2)}</p>
        <p><strong>Tax:</strong> $${Number(order.tax).toFixed(2)}</p>
        <p><strong>Total:</strong> $${Number(order.total).toFixed(2)}</p>
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
