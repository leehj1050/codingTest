import { db } from "../../utils/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  const listItem = collection(db, "list");
  const userSnap = await getDocs(query(listItem, orderBy("timestamp", "desc")));
  const result = userSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return res.status(200).json(result);
}
