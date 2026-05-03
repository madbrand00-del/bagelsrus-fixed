exports.handler = async function (event) {
  const order = JSON.parse(event.body);

  if (!order.phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No phone number provided" })
    };
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  const message = `Hi ${order.name}, your Bagels'R'us order ${order.orderNumber} is ready for pickup!`;

  const body = new URLSearchParams({
    From: fromNumber,
    To: order.phone,
    Body: message
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  );

  const data = await response.json();

  console.log("Twilio status:", response.status);
  console.log("Twilio response:", data);

  return {
    statusCode: response.ok ? 200 : 400,
    body: JSON.stringify(data)
  };
};
