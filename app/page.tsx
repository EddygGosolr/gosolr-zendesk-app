import Image from "next/image";
import Orders from "./orders/page";

export default function Home() {
  return (
    <main className='bg-blue-50'>
      <Orders/>
    </main>
  );
}