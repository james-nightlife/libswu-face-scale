import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRating } from "../redux/user/userSlice";
import axios from "axios";

import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";

/** ADDED BY JAMES */
import libbibiwave from "../assets/gif/พี่นกฮูกโบกมือ.gif";
import libbibihello from "../assets/gif/พี่นกฮูกสวัสดี.gif";

const Form = () => {
  //const { currentUser, service, serviceName, serviceNameEN } = useSelector((state) => state.user);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const service = localStorage.getItem("currentService");
  const serviceName = localStorage.getItem("currentServiceName");
  const serviceNameEN = localStorage.getItem("currentServiceNameEN");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  });

  const handleClick = (rate) => {
    Swal.fire({
      title: rate,
      text: "Confirm rating!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ขอบคุณค่ะ",
          text: "Thank You.",
          icon: "success",
        });
        dispatch(setRating(rate));
        seveRating(rate);
      }
    });
  };

  const seveRating = async (number) => {
    const rate = {
      fullname: currentUser.fullname,
      username: currentUser.username,
      rating: number,
      service,
    };
    try {
      await axios.post(
        "https://libportal.swu.ac.th/feedback/rating/score",
        rate
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="max-w-6xl p-3 mx-auto">
      <div className="flex flex-col items-center my-10">
        <div className="text-2xl font-semibold mt-5 md:text-3xl">
          กรุณาให้คะแนนความพึงพอใจการใช้บริการห้องสมุดดิจิทัล
        </div>
        <div className="text-xl font-semibold mt-5">
          Please Rate Satisfaction for Digital Library
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-16">
        <div className="flex flex-col items-center">
          <img
            src={img5}
            alt="img5"
            className="h-12 rounded-full cursor-pointer hover:opacity-70 md:h-40 shadow-lg"
            onClick={() => handleClick(5)}
          />
          <div className="text-green-700 mt-3">ดีมาก</div>
          <div className="text-green-700 font-semibold">Excellent</div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img4}
            alt="img4"
            className="h-12 rounded-full cursor-pointer hover:opacity-70 md:h-40 shadow-lg"
            onClick={() => handleClick(4)}
          />
          <div className="text-green-500 mt-3">ดี</div>
          <div className="text-green-500 font-semibold">Good</div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img3}
            alt="img3"
            className="h-12 rounded-full cursor-pointer hover:opacity-70 md:h-40 shadow-lg"
            onClick={() => handleClick(3)}
          />
          <div className="text-yellow-500 mt-3">พอใช้</div>
          <div className="text-yellow-500 font-semibold">Average</div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img2}
            alt="img2"
            className="h-12 rounded-full cursor-pointer hover:opacity-70 md:h-40 shadow-lg"
            onClick={() => handleClick(2)}
          />
          <div className="text-orange-500 mt-3">แย่</div>
          <div className="text-orange-500 font-semibold">Poor</div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img1}
            alt="img1"
            className="h-12 rounded-full cursor-pointer hover:opacity-70 md:h-40 shadow-lg"
            onClick={() => handleClick(1)}
          />
          <div className="text-red-700 mt-3">แย่มาก</div>
          <div className="text-red-700 font-semibold">Very Poor</div>
        </div>
      </div>
      <img className="fixed bottom-4 left-4 h-[200px] sm:h-[50vh]" src={libbibihello} />
      <img className="fixed bottom-4 right-4 h-[200px] sm:h-[50vh]" src={libbibiwave} />
    </div>
  );
};

export default Form;
