"use client";
import { useEffect, useState, FormEvent, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";
import InputBox from "src/components/inputBox";
import SubHeader from "src/components/subHeader";
import SubmitBtn from "src/components/submitBtn";

const Post = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [className, setClassName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [undergraduate, setUndergraduate] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState('');
  const [memo, setMemo] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/signin");
    else setUserName(token);
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/post`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          author: userName,
          class: className,
          doctor: doctorName,
          year: year,
          department: undergraduate,
          major: course,
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
    <div className={ styles.postContainer}>
      <InputBox
        type="text"
        name="className"
        placeholder="授業名"
        value={ className }
        handleChange={ handleChange }
        isRequired={ true } />
    </div>
    <div className={ styles.postContainer}>
      <InputBox
        type="text"
        name="doctorName"
        placeholder="教授名"
        value={ doctorName }
        handleChange={ handleChange }
        isRequired={ true } />
    </div>
    <div className={ styles.postwidth}>
      <select
        name="year"
        value={ year }
        onChange={handleChange}
        required
        className={styles.postselect}
      >
       <option value="" disabled hidden>年度</option>
       <option value="2020">2020</option>
       <option value="2021">2021</option>
       <option value="2022">2022</option> 
       <option value="2023">2023</option>
       <option value="2024">2024</option>
      </select>
      <select
        name="category"
        value={ category }
        onChange={handleChange}
        required
        className={styles.postselect}
      >
       <option value="" disabled hidden>分類</option>
       <option value="過去問">過去問</option>
       <option value="レポート">レポート</option>
       <option value="レジュメ">レジュメ</option> 
       <option value="その他">その他</option>
      </select>
       <select
        name="undergraduate"
        value={ undergraduate }
        onChange={handleChange}
        required
        className={styles.postselect}
      >
       <option value="" disabled hidden>学部</option>
       <option value="人文社会科学部">人文社会科学部</option>
       <option value="医学部">医学部</option>
       <option value="工学部">工学部</option>
       <option value="情報学部">情報学部</option> 
       <option value="農学部">農学部</option>
      </select>
      <select
        name="course"
        value={ course }
        onChange={handleChange}
        required
        className={styles.postselect}
      >
       <option value="" disabled hidden>学科</option>
       
       <optgroup label="人文社会科学部">
          <option value="法学科">法学科</option>
          <option value="社会学科">社会学科</option>
          <option value="経済学科">経済学科</option>
          <option value="国際学科">国際学科</option>
       </optgroup>
     
       <optgroup label="医学部">
          <option value="医学科">医学科</option>
       </optgroup>
      
       <optgroup label="工学部">
          <option value="機械工学科">機械工学科</option>
          <option value="電気電子工学科">電気電子工学科</option>
          <option value="電子物質工学科">電子物質工学科</option>
          <option value="化学バイオ工学科">化学バイオ工学科</option>
          <option value="数理システム工学科">数理システム工学科</option>
       </optgroup>
      
       <optgroup label="情報学部">
          <option value="情報科学科">情報科学科</option>
          <option value="行動情報学科">行動情報学科</option>
       </optgroup>
      
       <optgroup label="農学部">
          <option value="農学科">農学科</option>
       </optgroup>
      </select>
    </div>
    <div className={ styles.postContainer}>
      <InputBox
        type="text"
        name="image"
        placeholder="写真"
        value={ image }
        handleChange={ handleChange }
        isRequired={ false } />
    </div>
    <div className={ styles.postContainer}>
      <InputBox
        type="text"
        name="memo"
        placeholder="メモ"
        value={ memo }
        handleChange={ handleChange }
        isRequired={ false } />
    

    </div>
      <SubmitBtn btnText="追加・投稿" />
      { message && <p className={ styles.backendMessage }>{ message }</p> }
    </form>
    </>
  );
}
  
  

export default Post;
