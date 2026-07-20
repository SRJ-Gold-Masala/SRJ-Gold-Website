import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  await db.user.upsert({
    where:  { email: "admin@srjgold.com" },
    update: {},
    create: { email:"admin@srjgold.com", name:"SRJ Admin", role:"ADMIN" },
  });

  // Seed products
  const products = [
    {
      name:"Byadgi Chilli Powder", slug:"byadgi-chilli-powder",
      category:"GROUND_MASALA" as const, weight:"20g",
      description:"Deep ruby colour, mild heat. Sourced from Byadgi, Karnataka — India's finest chilli variety. Ideal for gravies, biryanis and tandoori marinades.",
      badge:"Premium", imageUrl:"/images/products/chilli.jpeg",
      accentColor:"#8B0000", sortOrder:1,
    },
    {
      name:"Turmeric Powder", slug:"turmeric-powder",
      category:"GROUND_MASALA" as const, weight:"20g",
      description:"Vibrant golden hue, earthy aroma. Sun-dried and stone-ground to preserve natural curcumin content and authentic flavour.",
      badge:"100% Pure", imageUrl:"/images/products/turmeric.jpeg",
      accentColor:"#B8860B", sortOrder:2,
    },
    {
      name:"Coriander Powder", slug:"coriander-powder",
      category:"GROUND_MASALA" as const, weight:"20g",
      description:"Freshly ground, citrus-warm aroma. Essential base for curries, dals and spice blends. Stone-ground for maximum oil retention.",
      badge:null, imageUrl:"/images/products/coriander.jpeg",
      accentColor:"#4A7C2F", sortOrder:3,
    },
  ];

  for (const p of products) {
    await db.product.upsert({
      where:  { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log("Seed complete.");
}

main().catch(console.error).finally(() => db.$disconnect());
