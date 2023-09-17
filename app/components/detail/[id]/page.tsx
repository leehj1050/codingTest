"use client";
import { useEffect, useState } from "react";
import detailCss from "../../../styles/write.module.css";
import { useRouter } from "next/navigation";
import * as DOMPurify from "dompurify";
import Loading from "../../list/loading";

export interface detailInfo {
  title: string;
  text: string;
}

export default function Detail(props: any) {
  const router = useRouter();
  const { id } = props.params;

  const [detail, setDetail] = useState<detailInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/detail?id=${id}`)
      .then((res) => res.json())
      .then((json) => {
        setDetail(json), setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까? [확인/취소]")) {
      fetch(`/api/delete?id=${id}`)
        .then((res) => res.json())
        .then((json) => {
          alert(json.message), router.push("/components/list");
        });
    } else {
      console.log("삭제취소");
    }
  };

  return (
    <main>
      <div className={detailCss.section}>
        <div>
          <h5>공지사항</h5>
        </div>

        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1>{detail?.title}</h1>

              <div className={detailCss.date_box}>
                <p>날짜</p>
              </div>

              <div className={detailCss.text_wrap}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(detail?.text)),
                  }}
                ></div>
              </div>
            </>
          )}
        </div>

        <div className={detailCss.button_wrap}>
          <button onClick={() => router.push("/components/list")}>
            목록으로
          </button>
          <button>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
    </main>
  );
}