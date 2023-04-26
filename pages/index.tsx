import Image from "next/image";
import { Inter } from "next/font/google";
import DynamicTable from "@/components/DynamicTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`p-2`}>
      <DynamicTable />
    </main>
  );
}
