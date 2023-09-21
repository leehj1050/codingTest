import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DetailApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const getDetail = (await getDoc(doc(db, "list", id))).data();
  const resultData = {
    ...getDetail,
    timestamp: getDetail !== undefined ? getDetail.timestamp.toDate() : "",
  };

  return res.status(200).json(resultData);
}
