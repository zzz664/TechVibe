import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const supabase = await createClient();
    const { data: { user }, error: auth_error} = await supabase.auth.getUser();
    if (user) {
      const { data: temp_post, error: select_error } = await supabase.from('admin_post').select('*').eq('author', user.id).is('status', null);
      if(temp_post?.length as number > 0) {
        const delete_error = await supabase.from('admin_post').delete().eq('author', user.id).is('status', null);
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};