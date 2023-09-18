"use client";
import editCss from "../../../styles/write.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuillEditor from "../../write/QuillEditor";

export interface editInfo {
  title: string;
  text: string;
  timestamp: string;
}

export default function Edit(props: any) {
  const router = useRouter();
  const { id } = props.params;
  //
  const [editData, setEditData] = useState<editInfo>({});
  const [date, setDate] = useState(""); //날짜
  //user수정
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState(editData.text);
  //
  useEffect(() => {
    fetch(`/api/detail?id=${id}`)
      .then((res) => res.json())
      .then((json) => setEditData(json));
  }, []);

  //date
  useEffect(() => {
    const str = editData?.timestamp || "";
    const strIndex = str.indexOf("T"); //10
    setDate(str.slice(0, strIndex));
    setEditText(editData.text);
  }, [editData]);

  //edit Title
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  //edit Text
  const handleEdit = () => {
    fetch("/api/edit", {
      method: "PUT",
      body: JSON.stringify({ title: editTitle, text: editText, id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.message);
        router.push("/components/list");
      });
  };

  return (
    <main>
      <div className={editCss.section}>
        <div>
          <h5>공지사항</h5>
        </div>

        <div>
          <input
            className={editCss.titleInput}
            name="title"
            defaultValue={editData?.title}
            onChange={handleChange}
          />
        </div>

        <div className={editCss.date_box}>
          <p>{date}</p>
        </div>

        <div className={editCss.editor_box}>
          <QuillEditor userText={editText} setUserText={setEditText} />
        </div>

        <div className={editCss.buttonBox}>
          <button onClick={() => router.push("/components/list")}>취소</button>
          <button onClick={handleEdit}>저장</button>
        </div>
      </div>
    </main>
  );
}
