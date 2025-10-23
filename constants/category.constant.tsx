import { CodeXml, BadgeDollarSign, Gamepad2, FileText } from "lucide-react";

export const MAIN_CATEGORYS = [
  { id: 1, label: "IT/프로그래밍", category: "programming", icon: <CodeXml/> },
  { id: 2, label: "암호화폐", category: "crypto", icon: <BadgeDollarSign/> },
  { id: 3, label: "게임", category: "game", icon: <Gamepad2/> },
];

export const SUB_CATEGORYS = [
  { id: 1, label: "c", main_category: "programming", sub_category: "c", icon: <FileText/> },
  { id: 2, label: "c++", main_category: "programming", sub_category: "cpp", icon: <FileText/> },
  { id: 3, label: "javascript", main_category: "programming", sub_category: "js", icon: <FileText/> },
  { id: 4, label: "typescript", main_category: "programming", sub_category: "ts", icon: <FileText/> },
  { id: 5, label: "react.js", main_category: "programming", sub_category: "react", icon: <FileText/> },
  { id: 6, label: "next.js", main_category: "programming", sub_category: "next", icon: <FileText/> },
  { id: 7, label: "3d", main_category: "programming", sub_category: "3d", icon: <FileText/> },
  { id: 8, label: "bitcoin", main_category: "crypto", sub_category: "bitcoin", icon: <FileText/> },
  { id: 9, label: "altcoin", main_category: "crypto", sub_category: "altcoin", icon: <FileText/> },
  { id: 10, label: "overwatch", main_category: "game", sub_category: "overwatch", icon: <FileText/> },
  { id: 11, label: "battlefield6", main_category: "game", sub_category: "battlefield6", icon: <FileText/> },
];

export const POST_CATEGORY = [
  { id: 1, label: "c", main_category: "programming", sub_category: "c" },
  { id: 2, label: "c++", main_category: "programming", sub_category: "cpp" },
  { id: 3, label: "javascript", main_category: "programming", sub_category: "js" },
  { id: 4, label: "typescript", main_category: "programming", sub_category: "ts" },
  { id: 5, label: "react.js", main_category: "programming", sub_category: "react" },
  { id: 6, label: "next.js", main_category: "programming", sub_category: "next" },
  { id: 7, label: "3d", main_category: "programming", sub_category: "3d" },
  { id: 8, label: "bitcoin", main_category: "crypto", sub_category: "bitcoin" },
  { id: 9, label: "altcoin", main_category: "crypto", sub_category: "altcoin" },
  { id: 10, label: "overwatch", main_category: "game", sub_category: "overwatch" },
  { id: 11, label: "battlefield6", main_category: "game", sub_category: "battlefield6" },
];