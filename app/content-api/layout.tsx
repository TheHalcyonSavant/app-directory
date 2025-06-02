const MERCHANT_ID = '5595215932';

async function startServer() {
  const bearerToken = '';
  return await fetch(`https://merchantapi.googleapis.com/products/v1beta/accounts/${MERCHANT_ID}/products`, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(console.error)
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const result = await startServer();
  // console.log(result.products[0]);
  return (
    <div className="flex">
      {children}
      <span>GOOG_SHOP_CLIENT_ID ${process.env.GOOG_SHOP_CLIENT_ID}</span>
    </div>
  );
};