import { NextResponse } from "next/server";
import { readProjects } from "../../lib/portfolio-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json({ projects });
}
