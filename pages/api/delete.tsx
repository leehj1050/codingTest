import { db } from "@/utils/firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DeleteApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  await deleteDoc(doc(db, "list", id));

  return res.status(200).json({ message: "삭제완료" });
}
