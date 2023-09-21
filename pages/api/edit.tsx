import { db } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore/lite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function EditApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //time
  const nowTime = new Date();
  const body = JSON.parse(req.body);
  try {
    await updateDoc(doc(db, "list", body.id), {
      ...body,
      time: nowTime.getTime(), //작성시간 몇초전..몇분전..을 위한
      timestamp: nowTime, //시간순 정렬을 위한
    });
    return res
      .status(200)
      .json({ message: "게시물이 성공적으로 수정 되었습니다." });
  } catch (error) {
    console.error("게시물 추가 오류:", error);
    return res
      .status(500)
      .json({ message: "게시물 수정 중 오류가 발생했습니다" });
  }
}
