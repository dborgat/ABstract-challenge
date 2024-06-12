import { JsonDB, Config } from "node-json-db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new JsonDB(new Config("db", true, false, "/"));

  if (req.method === "DELETE") {
    try {
      const query = req.query;
      const { pokemonId } = query;

      await db.delete(
        "/catchedPokemon[" +
        (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
        "]"
      );

      return res.status(200).send("Pokemon released!");
    } catch {
      return res.status(409).send("Pokemon not found");
    }
  }
  return res.status(405).send("Method not allowed.");
}
