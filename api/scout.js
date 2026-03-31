export default async function handler(req, res) {
  const { origin, destination, departure_date } = req.body;

  const response = await fetch('https://api.duffel.com/air/offer_requests', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DUFFEL_ACCESS_TOKEN}`,
      'Duffel-Version': 'v1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        slices: [{ origin, destination, departure_date }],
        passengers: [{ type: "adult" }],
        cabin_class: "economy"
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
