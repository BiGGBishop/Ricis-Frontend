import Header from "../components/Header";
import Image from "next/image";
import FirstSect from "./FirstSect";
import Services from "./Services";
import ThirdSect from "./ThirdSect";
import Notice from "./Notice";
import Footer from "../components/Footer";
import MainLayout from "../components/mainLayout";

export default function Home() {
	return (
		<MainLayout>
			<div className="">
				<FirstSect />
				<Services />
				{/* <ThirdSect />
				<Notice /> */}
			</div>
		</MainLayout>
	);
}
