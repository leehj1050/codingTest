import loading from "../../styles/loading.module.css";

export default function Loading() {
  return (
    <div className={loading.box}>
      <div className={loading.loader}></div>
    </div>
  );
}
