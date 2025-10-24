import { z } from "zod";

{/*login form의 규칙구조*/ }
export const formSchema = z.object({
  email: z.email({
    error: "올바른 e-mail 양식을 입력해주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
});