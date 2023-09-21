"use client";
import write from "../../styles/write.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuillEditor from "../../QuillEditor";

export default function Write() {
  const router = useRouter();
  //date
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (1 + now.getMonth())).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);

  //user입력
  const [userTitle, setUserTitle] = useState("");
  const [userText, setUserText] = useState("");

  //onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTitle(e.target.value);
  };

  //onClick
  const handleSave = () => {
    if (userTitle === "") {
      alert("제목을 입력해주세요");
    } else if (userText === "") {
      alert("내용을 입력해주세요");
    } else {
      if (confirm("게시물을 등록하시겠습니까?")) {
        fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ title: userTitle, text: userText }),
        })
          .then((res) => res.json())
          .then((json) => {
            alert(json.message), router.push("/components/list");
          });
      }
    }
  };

  return (
    <main>
      <div className={write.section}>
        <div>
          <h5>공지사항</h5>
        </div>

        <div>
          <input
            className={write.titleInput}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className={write.date_box}>
          <p>{`${year}. ${month}. ${day}`}</p>
        </div>

        <div className={write.editor_box}>
          <QuillEditor userText={userText} setUserText={setUserText} />
        </div>

        <div className={write.buttonBox}>
          <button onClick={() => router.push("/components/list")}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </main>
  );
}
