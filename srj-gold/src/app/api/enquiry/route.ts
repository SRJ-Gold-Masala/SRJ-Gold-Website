import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendEnquiryEmail } from "@/lib/mail";

const Schema = z.object({
  name:        z.string().min(2),
  phone:       z.string().min(6),
  email:       z.string().email(),
  quantity:    z.string().optional(),
  message:     z.string().optional(),
  productId:   z.string().optional(),
  productName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = Schema.parse(body);

    await db.enquiry.create({
      data: {
        name:      data.name,
        phone:     data.phone,
        email:     data.email,
        quantity:  data.quantity,
        message:   data.message,
        productId: data.productId,
      },
    });

    await sendEnquiryEmail({
      customerName:  data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      productName:   data.productName,
      quantity:      data.quantity,
      message:       data.message,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[ENQUIRY]", err);
    return NextResponse.json({ success:false, error: err.message }, { status:400 });
  }
}
