import Image from "next/image";
import SadCat from "../public/sadcat_1.png";

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <p>お探しのページが見つかりませんでした</p>
      <Image src={SadCat} alt="sadcat" />
    </>
  );
}

export default NotFound;