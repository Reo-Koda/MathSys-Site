"use client";
import { useState, FormEvent, SetStateAction } from "react";
import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";
import InputBox from "src/components/inputBox";
import SubHeader from "src/components/subHeader";
import SubmitBtn from "src/components/submitBtn";

const Post = () => {
  const [userName, setUserName] = useState('月島 蛍')
  const [className, setClassName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [undergraduate, setUndergraduate] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState('');
  const [memo, setMemo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: userName,
          class_title: className,
          doctor_name: doctorName,
          year_num: year,
          undergraduate: undergraduate,
          course: course,
          category: category,
          images: image,
          memo: memo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`データ追加 新規ID: ${ data.id }`);
        // window.location.reload();
      } else {
        setMessage(`エラー: ${ data.error }`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${ error.message }`);
    }
  }

  const handleChange = (e: { target: { name: string; value: SetStateAction<string>; }; }) => {
    if (e.target.name === "className") {
      setClassName(e.target.value);
    } else if (e.target.name === "doctorName") {
      setDoctorName(e.target.value);
    } else if (e.target.name === "year") {
      setYear(e.target.value);
    } else if (e.target.name === "category") {
      setCategory(e.target.value);
    } else if (e.target.name === "undergraduate") {
      setUndergraduate(e.target.value);
    } else if (e.target.name === "course") {
      setCourse(e.target.value);
    } else if (e.target.name === "image") {
      setImage(e.target.value);
    } else if (e.target.name === "memo") {
      setMemo(e.target.value);
    }
  }
  return (
    <>
    <TopList topList={ topList }/>

    <form onSubmit={ handleSubmit } className={ styles.postContainer }>
      <SubHeader
      title="投稿"
      text="以下の必要な項目を入力してください" />

      <InputBox
        type="text"
        name="className"
        placeholder="授業名"
        value={ className }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="doctorName"
        placeholder="教授名"
        value={ doctorName }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="year"
        placeholder="年度"
        value={ year }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="category"
        placeholder="分類"
        value={ category }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="undergraduate"
        placeholder="学部"
        value={ undergraduate }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="course"
        placeholder="学科"
        value={ course }
        handleChange={ handleChange }
        isRequired={ true } />
      <InputBox
        type="text"
        name="image"
        placeholder="写真"
        value={ image }
        handleChange={ handleChange }
        isRequired={ false } />
      <InputBox
        type="text"
        name="memo"
        placeholder="メモ"
        value={ memo }
        handleChange={ handleChange }
        isRequired={ false } />
      <SubmitBtn btnText="追加" />
      { message && <p className={ styles.backendMessage }>{ message }</p> }
    </form>
    </>
  );
}

export default Post;