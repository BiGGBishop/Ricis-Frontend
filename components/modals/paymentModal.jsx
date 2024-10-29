// import { useCreateFlutterTransactionMutation } from "@/store/api/applicationApi";
// import Btn from "../Btn";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { normalizeErrors } from "@/utils/helpers";
// import { toast } from "react-toastify";
// import { Cancel } from "@/svgs";

// const PaymentModal = ({ application_id, setPaynow }) => {
//   const router = useRouter();
//   const [
//     createFlutterTransaction,
//     { isLoading, isSuccess, isError, error, data },
//   ] = useCreateFlutterTransactionMutation();

//   const createNewPayment = async () => {
//     if (!application_id) {
//       toast.error("Application id not found!", { autoClose: 3000 });
//       return;
//     }
//     const payload = { application_id };
//     await createFlutterTransaction(payload);
//   };

//   useEffect(() => {
//     if (error) {
//       const err = normalizeErrors(error);
//       toast.error(err, { autoClose: 2000 });
//     }
//   }, [error]);

//   useEffect(() => {
//     if (isSuccess) {
//       const paymentLink = data?.data?.link;
//       router.push(paymentLink);
//     }
//   }, [isSuccess]);

//   return (
//     <div className="flex justify-center items-center fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
//       <div className="bg-white px-4 pb-6 pt-4 rounded shadow-md md:w-[500px] z-[9999] space-y-6">
//         <div onClick={() => setPaynow(false)} className="flex justify-end">
//           <span className="cursor-pointer">{Cancel}</span>
//         </div>
//         <div className="space-y-2">
//           <h1 className="lg:text-2xl text-xl text-gray-800">
//             Proceed to payment
//           </h1>
//           <p className="text-sm textgray-400">
//             To complete your application submission, you're required to make
//             payment.
//           </p>
//         </div>
//         <div className="flex gap-4">
//           <button
//             onClick={() => router.push("/user")}
//             className="text-sm bg-blue-400 py-1.5 px-4 shadow-md rounded-md text-white hover:opacity-75 transform active:scale-75 transition-transform"
//           >
//             Pay later
//           </button>
//           <Btn
//             text="Pay now"
//             loadingMsg="creating transaction..."
//             bgColorClass="bg-[#46B038]"
//             loading={isLoading}
//             handleClick={createNewPayment}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;
import { useRouter } from 'next/navigation';
import { Cancel } from '@/svgs';
import Btn from '../Btn';
import { toast } from 'react-toastify';

const PaymentModal = ({ setPaynow }) => {
  const router = useRouter();

  const handlePayNow = () => {
    toast.info('Payment functionality coming soon!', { autoClose: 3000 });
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
      <div className="bg-white px-4 pb-6 pt-4 rounded shadow-md md:w-[500px] z-[9999] space-y-6">
        <div onClick={() => setPaynow(false)} className="flex justify-end">
          <span className="cursor-pointer">{Cancel}</span>
        </div>
        <div className="space-y-2">
          <h1 className="lg:text-2xl text-xl text-gray-800">
            Proceed to payment
          </h1>
          <p className="text-sm textgray-400">
            To complete your application submission, you're required to make
            payment.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/user')}
            className="text-sm bg-blue-400 py-1.5 px-4 shadow-md rounded-md text-white hover:opacity-75 transform active:scale-75 transition-transform"
          >
            Pay later
          </button>
          <Btn
            text="Pay now"
            loadingMsg="Processing..."
            bgColorClass="bg-[#46B038]"
            loading={false}
            handleClick={handlePayNow}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
