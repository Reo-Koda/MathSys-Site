"use client";
import { useEffect, useState, FormEvent, SetStateAction, JSX } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "../../components/topList";
import SubHeader from "src/components/subHeader";
import SubmitBtn from "src/components/submitBtn";
import FormGroup from "../../components/formGroup";

const Post = (): JSX.Element => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [className, setClassName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [undergraduate, setUndergraduate] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/auth/status`, {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        setUserName(json.userName);
        if (!json.userName) {
          router.push("/signin");
        }
      } catch (err: any) {
        console.error("セッションチェックでエラー:", err);
      };
    }

    getAuthStatus();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/post`, {
        method: "POST",
          credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          class: className,
          doctor: doctorName,
          year: year,
          department: undergraduate,
          major: course,
          category,
          images: image,
          memo: memo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`データ追加 新規ID: ${data.id}`);
        router.push("/");
      } else {
        setMessage(`エラー: ${data.error}`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${error.message}`);
    }
  };

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
    <TopList />
    <div className={ styles.container }>
      <SubHeader
        title="投稿"
        text="以下の必要な項目を入力してください"
      />
    <form onSubmit={ handleSubmit } className={ styles.postContainer }>
      <div className={ styles.formgrid }>
        <FormGroup 
            type="text"
            labeltitle="className"
            nametitle="授業名"
            value={ className }
            handleChange={ handleChange }
            isRequired={ true }
        />
        <FormGroup 
            type="text"
            labeltitle="doctorName"
            nametitle="教授名"
            value={ doctorName }
            handleChange={ handleChange }
            isRequired={ true }
        />
          <FormGroup 
            type="text"
            labeltitle="year"
            nametitle="年度"
            value={ year }
            handleChange={ handleChange }
            isRequired={ true }
        />
        
        <div className={ styles.formgroup }>
          <label htmlFor="category">分類</label>
          <select  name="category" value={ category } onChange={ handleChange } required >
              <option value="" disabled hidden>選択してください</option>
              <option value="過去問">過去問</option>
              <option value="レポート">レポート</option>
              <option value="レジュメ">レジュメ</option>
              <option value="その他">その他</option>
            </select>
        </div>

        <FormGroup 
            type="text"
            labeltitle="undergraduate"
            nametitle="学部"
            value={ undergraduate }
            handleChange={ handleChange }
            isRequired={ true }
        />
        <FormGroup 
            type="text"
            labeltitle="course"
            nametitle="学科"
            value={ course }
            handleChange={ handleChange }
            isRequired={ true }
        />
        <div className={ styles.fullWidth }>
          <FormGroup 
              type="text"
              labeltitle="image"
              nametitle="写真URL"
              value={ image }
              handleChange={ handleChange }
              isRequired={ false }
          />
          <FormGroup 
              type="textarea"
              labeltitle="memo"
              nametitle="メモ"
              value={ memo }
              handleChange={ handleChange }
              isRequired={ false }
          />
        </div>
      </div>
      

      <div className={ styles.submitplace }>
        <SubmitBtn btnText="追加・投稿" />
      </div>
      
      { message && <p className={ styles.backendMessage }>{ message }</p> }
      </form>
    </div>
    </>
  );
};

export default Post;
