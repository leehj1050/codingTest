import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore/lite";

export default async function DetailApi(req: Request, res: Response) {
  const getDetail = await getDoc(doc(db, "list", req.query.id)).then((data) =>
    data.data()
  );
  return res.status(200).json(getDetail);
}
