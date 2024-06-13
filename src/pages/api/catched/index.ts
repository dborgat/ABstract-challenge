import { JsonDB, Config } from "node-json-db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new JsonDB(new Config("db", true, false, "/"));
  if (req.method === "GET") {
    const data = await db.getData("/catchedPokemon");

    return res.status(200).json(data);

  } else if (req.method === "POST") {
    const { id, name, image, types } = req.body;

    const newPokemon = { id, name, image, types, };
    const index = await db.getIndex("/catchedPokemon", Number(newPokemon.id));

    if (index === -1) {
      await db.push("/catchedPokemon[]", newPokemon);
      return res.status(200).json(newPokemon);
    } else {
      return res.status(409).send("Pokemon already catched!");
    }
  }
  return res.status(405).send("Method not allowed.");
}
