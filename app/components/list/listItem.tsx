import item from "../../styles/listItem.module.css";

export default function ListItem() {
  return (
    <div className={item.section}>
      <div>
        <div className={item.item}>
          <p>공지사항 제목입니다. 공백포함 100자 넘을경우 줄바꿈 </p>
          <p>작성시간</p>
        </div>
      </div>
      <span></span>
    </div>
  );
}
