'use client'
import Image from "next/image";
import EmployeePage from "./employee/page";
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  return (
   <>
     <div className="p-4">

     <EmployeePage/>
    </div>
   </>
  );
}
