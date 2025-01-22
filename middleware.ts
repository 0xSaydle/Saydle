import { NextResponse, NextRequest } from "next/server";

const middleware = (req: NextRequest, res: NextResponse) => {
  // implement private routes here
  console.log("pathname: ", req.nextUrl.pathname);

  return NextResponse.next();
};
const config = {
  matcher: ["/"],
};
export default middleware;
