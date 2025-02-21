import Image from "next/image";
import SadCat from "../public/download20250201122629.png";

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <p>お探しのページが見つかりませんでした</p>
      <Image src={SadCat} alt="sadcat" />
    </>
  )
}

export default NotFound