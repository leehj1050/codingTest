"use client";
import editCss from "../../styles/write.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuillEditor from "../../QuillEditor";

interface propsType {
  title: string;
  text: string;
  timestamp: string;
}

interface EditProps {
  params: {
    id: string;
  };
}

export default function Edit(props: EditProps) {
  const router = useRouter();
  const { id } = props.params;
  //
  const [editData, setEditData] = useState<propsType | null>(null); //수정할 데이터 불러옴
  const [date, setDate] = useState(""); //날짜
  //user수정
  const [editTitle, setEditTitle] = useState<string>(""); //수정된 title
  const [editText, setEditText] = useState<string>(""); //수정된 text
  //
  useEffect(() => {
    fetch(`/api/detail?id=${id}`)
      .then((res) => res.json())
      .then((json) => setEditData(json));
  }, []);

  //date
  useEffect(() => {
    if (editData) {
      const str = editData.timestamp || "";
      const strIndex = str.indexOf("T"); //10
      setDate(str.slice(0, strIndex));
      setEditText(editData.text);
      setEditTitle(editData.title);
    }
  }, [editData]);

  //edit Title
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  //edit Text
  const handleEdit = () => {
    if (editTitle === "") {
      alert("제목을 입력해주세요");
    } else if (editText === "") {
      alert("내용을 입력해주세요");
    } else {
      fetch("/api/edit", {
        method: "PUT",
        body: JSON.stringify({
          title: editTitle,
          text: editText,
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          router.push("/list");
          alert(json.message);
        });
    }
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
            value={editTitle}
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
          <button onClick={() => router.push("/list")}>취소</button>
          <button onClick={handleEdit}>저장</button>
        </div>
      </div>
    </main>
  );
}
