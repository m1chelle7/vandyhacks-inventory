import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;
app.use(cors());

// send delivery data
app.get("/api/data/delivery", async (req: Request, res: Response) => {
  try {
    const data = await prisma.delivery.findMany({
      include: {
        itemtype: {
          select: {
            name: true,
          },
        },
      },
    });
    const transformedData = data.map((delivery) => ({
      id: delivery.id,
      type: delivery.itemtype.name,
      quantity: delivery.quantity,
      price: delivery.price,
      company: delivery.company,
      deliverydate: delivery.deliverydate,
      arrivaldate: delivery.arrivaldate,
    }));
    res.send(transformedData);
    console.log(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// send inventory data
app.get("/api/data/inventory", async (req: Request, res: Response) => {
  try {
    const data = await prisma.inventory.findMany({
      include: {
        itemtype: {
          select: {
            name: true,
          },
        },
      },
    });
    const transformedData = data.map((inventory) => ({
      id: inventory.id,
      type: inventory.itemtype !== null ? inventory.itemtype.name : "N/A",
      quantity: inventory.quantity,
    }));
    res.send(transformedData);
    console.log(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// send deleted deliveries data
app.get("/api/data/deldelivery", async (req: Request, res: Response) => {
  try {
    const data = await prisma.deldelivery.findMany({
      include: {
        itemtype: {
          select: {
            name: true,
          },
        },
      },
    });
    const transformedData = data.map((deldelivery) => ({
      id: deldelivery.id,
      quantity: deldelivery.quantity,
    }));
    res.send(transformedData);
    console.log(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
