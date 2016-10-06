const Email = {};

Email.compose = (orderInfo, storeName, context) => {
  const emailHtml = [];
  emailHtml.push(`<div><p>Hello ${orderInfo.customer.name},</p><div>`);
  if (context === 'pending') {
    emailHtml.push(`<div><p>Thank you,
      ${storeName} is currently reviewing your order.
      We will get back to you shortly.</p></div>`);
  } else if (context === 'accepted') {
    emailHtml.push(`<div><p>Congratulations!!,
      ${storeName} accepted your order.</p></div>`);
  } else if (context === 'updated') {
    emailHtml.push(`<div><p> ${storeName} updated your order.</p></div>`);
  }

  emailHtml.push('<div><p>Below are your order details:</p></div>');
  emailHtml.push(`<div><h3>Order number: ${orderInfo.order.id}</h3></div>`);
  emailHtml.push(`<div>
                  <table>
                  <thead>
                  <tr>
                    <th style="border:1px solid #999; padding:0.5rem">Item Id</th>
                    <th style="border:1px solid #999; padding:0.5rem">Name</th>
                    <th style="border:1px solid #999; padding:0.5rem">Price</th>
                    <th style="border:1px solid #999; padding:0.5rem">Quantity</th>
                    <th style="border:1px solid #999; padding:0.5rem">Total</th>
                  </tr>
                  </thead>
                  <tbody>`);
  emailHtml.push(orderInfo.items.map(item =>
    (`<tr>
      <td style="border:1px solid #999; padding:0.5rem">${item.id}</td>
      <td style="border:1px solid #999; padding:0.5rem">${item.name}</td>
      <td style="border:1px solid #999; padding:0.5rem">$${item.price}</td>
      <td style="border:1px solid #999; padding:0.5rem">${item.quantity}</td>
      <td style="border:1px solid #999; padding:0.5rem">$${item.total}</td>
    </tr>`)
  ).join(''));
  emailHtml.push('</tbody></table></div>');
  emailHtml.push(`<div>
  <h4>${orderInfo.package.name}: $${orderInfo.package.cost}</h4>
  </div>`);
  emailHtml.push(`<div>
    <h4>Total price: $${orderInfo.order.total_price}</h4>
    </div>`);
  emailHtml.push('<br>');
  emailHtml.push('<div><p>Thank You, </p></div>');
  emailHtml.push('<div><p>QuickerCater</p></div>');
  return emailHtml.join('');
};
export default Email;
