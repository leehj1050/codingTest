import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore/lite";

export default async function DetailApi(req: Request, res: Response) {
  const getDetail = (await getDoc(doc(db, "list", req.query.id))).data();
  const resultData = { ...getDetail, timestamp: getDetail.timestamp.toDate() };

  return res.status(200).json(resultData);
}
