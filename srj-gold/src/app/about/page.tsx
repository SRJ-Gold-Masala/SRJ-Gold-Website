import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AboutClient } from "./AboutClient";
export const metadata = { title: "About Us" };
export default function AboutPage() {
  return ( <><Nav /><AboutClient /><Footer /></> );
}
