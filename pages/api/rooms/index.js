import dbConnect from "../../../util/mongo";
import Room from "../../../models/Room";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token
console.log(cookies);
  dbConnect();

  if (method === "GET") {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const room = await Room.create(req.body);
      res.status(201).json(room);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
