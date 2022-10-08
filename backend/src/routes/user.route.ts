import { Router } from "express";

const router = Router();

const stocks = [
  { id: 1, ticker: "AAPL", price: 497.48 },
  { id: 2, ticker: "MSFT", price: 213.02 },
  { id: 3, ticker: "AMZN", price: 3284.72 },
];

/*router.post("/register", register);
router.post("/login", login);
router.get("/", extractJWT, getUsers);*/

router.get("/", (_req, res) => {
  return res.status(200).json({ data: stocks });
});

router.get("/realtime-price", (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });

  //response.flushHeaders();

  const interval = setInterval(() => {
    const data = `data: ${JSON.stringify({
      ...stocks[getRandomStock()],
      price: Date.now(),
    })}\n\n`;
    response.write(data);
  }, 3000);

  const clientId = Date.now();

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clearInterval(interval);
    response.end();
  });
});

function getRandomStock() {
  return Math.round(Math.random() * (2 - 0) + 0);
}
function getRandomPrice() {
  return Math.random() * (5000 - 20) + 20;
}

export default router;
