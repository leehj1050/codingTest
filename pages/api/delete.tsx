import { db } from "@/utils/firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";

export default async function DeleteApi(req: Request, res: Response) {
  await deleteDoc(doc(db, "list", req.query.id));

  return res.status(200).json({ message: "삭제완료" });
}
