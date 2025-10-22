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
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">새로운 통찰과 관점으로 길을 밝히세요.</h3>
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
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">이용약관</p>
            <Separator orientation="vertical" className="h-7!"/>
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">개인정보처리방침</p>
            <Separator orientation="vertical" className="h-7!"/>
            <p className="prevent-drag cursor-pointer transition-all hover:font-bold duration-500">건의사항</p>
          </div>
        </div>
        <Separator/>
        <div className="w-full flex items-start justify-between">
          <div className="h-full flex flex-col gap-2 justify-between">
            <p className="text-[20px] font-semibold">고객센터</p>
            <div className="flex flex-col gap-1">
              <p className="text-xs">평일 오전 9시 ~ 오후 6시</p>
              <p className="text-xs">문의 : temperis0512@gmail.com</p>
            </div>
            <p className="text-xs">© Seonwoo-Lee all rights reserved</p>
          </div>
          <div className="flex flex-col gap-2 mr-[62px]">
            <p className="text-[20px] font-semibold">사업자 정보</p>
            <div className="flex flex-col gap-2">
              <p className="text-xs">대표이사 : 이선우</p>
              <p className="text-xs">사업자 번호 : 000-00-00000</p>
              <p className="text-xs">통신판매신고번호 : 2025-고양-0000</p>
              <p className="text-xs">주소 : 고양시 일산서구 xxx로 xx</p>
              <p className="text-xs">대표번호 : 000-0000-0000</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };