import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params:{ id:string } }) {
  try {
    await requireAdmin();
    const body    = await req.json();
    const product = await db.product.update({ where:{ id: params.id }, data: body });
    return NextResponse.json({ success:true, data: product });
  } catch (err: any) {
    return NextResponse.json({ success:false, error: err.message }, { status:400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params:{ id:string } }) {
  try {
    await requireAdmin();
    await db.product.delete({ where:{ id: params.id } });
    return NextResponse.json({ success:true });
  } catch (err: any) {
    return NextResponse.json({ success:false, error: err.message }, { status:400 });
  }
}
