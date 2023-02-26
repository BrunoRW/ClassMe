
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: ""
});

export default async function handler(req, res) {

  let pix = "";
  
  var payment_data = await {
    transaction_amount: 100,
    description: 'Título do produto',
    payment_method_id: 'pix',
    payer: {
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
      identification: {
          type: 'CPF',
          number: '19119119100'
      },
      address:  {
          zip_code: '06233200',
          street_name: 'Av. das Nações Unidas',
          street_number: '3003',
          neighborhood: 'Bonfim',
          city: 'Osasco',
          federal_unit: 'SP'
      }
    }
  };

await mercadopago.payment.create(payment_data).then(function (data) {
  
  pix = data.response.point_of_interaction.transaction_data.qr_code

  console.log(data) 

  res.status(200).json({ pix_link: pix, pix_img: `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${pix}` })

}).catch(function (error) {

  res.status(200).json({ erro: error })

});
}
