import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

// ...

const app = express();
const PORT = 3001;
app.use(cors());

const prisma = new PrismaClient();

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const data = await prisma.delivery.findMany()
    res.send(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});