import { useMemo, useRef, forwardRef } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
//
import { storage } from "../utils/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Loading from "./list/loading";

//dynamic => react-quill을 브라우저에서 작동시키도록 함
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardRef, ...props }) {
      return <RQ ref={forwardRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <Loading /> }
);

// 에디터 생성
const QuillEditor = ({ userText, setUserText }) => {
  const quillRef = useRef();

  // quill에서 사용할 모듈
  // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지

  // 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(storage, `image/${Date.now()}`);
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  //(핸들러가 모듈보다 위에 있어야함)
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    };
  }, []);

  return (
    <ReactQuill
      forwardRef={quillRef}
      theme="snow"
      value={userText}
      onChange={setUserText}
      modules={modules}
    />
  );
};
export default QuillEditor;
