import Image from "next/image";
import { Button, Separator } from "../ui";

function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex flex-col gap-6 p-6 pb-18">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">끝없이 발전하는 세상에서,</h3>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">도태되지 않는 사람으로 살아가자.</h3>
            </div>
            <div className="flex items-center gap-4">
              <Button variant={"outline"} size={"icon"} className="border-0">
                <Image src="/kakao.png" width={240} height={240} alt="@KAKAO"/>
              </Button>
              <Button variant={"outline"} size={"icon"} className="border-0">
                <Image src="/github-white.png" width={240} height={240} alt="@GITHUB"/>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">FIRST</p>
            <Separator orientation="vertical" className="h-7!"/>
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">NEXT.JS</p>
            <Separator orientation="vertical" className="h-7!"/>
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">PROJECT</p>
          </div>
        </div>
        <Separator/>
        <div className="w-full flex items-start justify-between">
          <div className="h-full flex flex-col gap-2 justify-between">
            <p className="text-[20px] font-semibold">CONTACT US</p>
            <div className="flex flex-col gap-1">
              <p className="text-xs">평일 오전 9시 ~ 오후 6시</p>
              <p className="text-xs">e-mail : temperis0512@gmail.com</p>
              <p className="text-xs">또는 카카오 링크로 연락주세요.</p>
            </div>
            <p className="text-xs">© Seonwoo-Lee all rights reserved</p>
          </div>
          <div className="flex flex-col gap-2 mr-[10px]">
            <p className="text-[20px] font-semibold">제작자 정보</p>
            <div className="flex flex-col gap-2">
              <p className="text-xs">제작자 : 이선우</p>
              <p className="text-xs">출생 : 1998-09-19</p>
              <p className="text-xs">선린 인터넷 고등학교 졸업</p>
              <p className="text-xs">동국대학교 컴퓨터공학과 졸업</p>
              <p className="text-xs">現 프론트엔드 개발자 취준생</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };