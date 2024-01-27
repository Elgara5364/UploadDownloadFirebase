import Image from "next/image";
import Upload from "./upload/page";
// import Download from "./download/page";

export default function Home() {
  return (
    <div>
      <Upload />
      {/* <Download /> */}
    </div>
  );
}
