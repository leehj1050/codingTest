"use client";
import { useEffect, useState } from "react";
import item from "../../styles/listItem.module.css";
import Loading from "./loading";
import Link from "next/link";
import { Timestamp } from "firebase/firestore/lite";

export interface IDetailInfo {
  title: string;
  text: string;
  id: string;
  time: number;
}

export default function ListItem() {
  const [data, setData] = useState<IDetailInfo[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [resultTime, setResultTime] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      await fetch("/api/list")
        .then((res) => res.json())
        .then((data) => {
          setData(data), setLoading(false);
        });
    };
    getListData();
  }, []);

  //time
  useEffect(() => {
    const result = data.map((time) => detailDate(time.time));
    setResultTime(result);
  }, [data]);
  console.log(resultTime);

  const detailDate = (a: number) => {
    const milliSeconds: number = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return "방금전";
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <div className={item.section}>
      <div className={item.item_wrap}>
        {loading ? (
          <div className={item.emptyBox}>
            <div style={{ textAlign: "center" }}>
              <Loading />
            </div>
          </div>
        ) : data.length > 0 ? (
          data.map((i, idx) => {
            return (
              <Link
                href={`/components/detail/${i.id}`}
                className={item.item}
                key={idx}
              >
                <p>{i.title}</p>
                <p>{resultTime[idx]}</p>
              </Link>
            );
          })
        ) : (
          <div className={item.emptyBox}>
            <p style={{ textAlign: "center", padding: "3em 0" }}>
              공지사항이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
