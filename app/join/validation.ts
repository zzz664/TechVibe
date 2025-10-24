import { z } from "zod";

{/*join form의 규칙구조*/ }
export const formSchema = z.object({
  email: z.email({
    error: "올바른 e-mail 양식을 입력해주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
  confirmPassword: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
  nickname: z.string().regex(/[가-힣a-zA-Z0-9]$/, {
    error: "닉네임에 특수문자나 단자음, 단모음을 사용할 수 없습니다."
  }).min(2, {
    error: "닉네임은 최소 2글자 이상입니다."
  }).max(6, {
    error: "닉네임은 최대 6글자 입니다."
  }),
}).refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  error: "비밀번호가 일치하지 않습니다.",
});