import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../../utils/firebase";

export default async function UploadApi(req: Request, res: Response) {
  //time
  const nowTime = new Date();
  //
  const body = JSON.parse(req.body);
  if (req.method === "POST") {
    await addDoc(collection(db, "list"), {
      ...body,
      time: nowTime.getTime(), //작성시간 몇초전..몇분전..을 위한
      timestamp: nowTime, //시간순 정렬을 위한
    });
  }
  return res.status(200).json({ message: "게시글이 등록 되었습니다." });
}
