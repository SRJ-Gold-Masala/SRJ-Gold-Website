import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ContactClient } from "./ContactClient";
export const metadata = { title: "Contact" };
export default function ContactPage() {
  return ( <><Nav /><ContactClient /><Footer /></> );
}
