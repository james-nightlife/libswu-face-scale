import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setService, setServiceName, setServiceNameEN } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Service = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const currentUser = localStorage.getItem("currentUser");
  const [selectData, setSelectData] = useState(null);
  const [selectError, setSelectError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** ADDED BY JAMES */
  const [selectServiceName, setSelectServiceName] = useState(null);
  const [selectServiceNameEN, setSelectServiceNameEN] = useState(null);

  useEffect(() => {
      if (!currentUser) {
        navigate("/sign-in");
      }
    }, []);

  const options = [
    {
      label: "กรุณาเลือกบริการ",
      value: "noSelect",
    },
    {
      label: "องครักษ์ - เคาน์เตอร์บริการ ชั้น 1",
      value: "okl-counter-1",
      name: "การติดต่อเคาน์เตอร์บริการ ชั้น 1",
      name_en: "for Counter Service at 1st Floor",
    },
    {
      label: "องครักษ์ - เคาน์เตอร์บริการ ชั้น 2",
      value: "okl-counter-2",
      name: "การติดต่อเคาน์เตอร์บริการ ชั้น 2",
      name_en: "for Counter Service at 2st Floor",
    },
    {
      label: "องครักษ์ - เคาน์เตอร์บริการ ชั้น 3",
      value: "okl-counter-3",      
      name: "การติดต่อเคาน์เตอร์บริการ ชั้น 3",
      name_en: "for Counter Service at 3rd Floor",
    },
    {
      label: "องครักษ์ - เคาน์เตอร์บริการ ชั้น 4",
      value: "okl-counter-4",
      name: "การติดต่อเคาน์เตอร์บริการ ชั้น 4",
      name_en: "for Counter Service at 4th Floor",
    },
    {
      label: "องครักษ์ - เคาน์เตอร์บริการ ชั้น 5",
      value: "okl-counter-5",      
      name: "การติดต่อเคาน์เตอร์บริการ ชั้น 5",
      name_en: "for Counter Service at 5th Floor",
    },
  ];

  const handleChange = (e) => {
    setSelectData(e.target.value);
    setSelectError(false);
  };

  /** ADDED BY JAMES */
  useEffect(() => {
    setSelectServiceName(options.filter(obj => obj.value === selectData)[0]?.name);
    setSelectServiceNameEN(options.filter(obj => obj.value === selectData)[0]?.name_en)
  }, [selectData])

  const handleSelectSubmit = (e) => {
    e.preventDefault();

    if (selectData == null || selectData == "noSelect") {
      setSelectError(true);
    } else {
      //dispatch(setService(selectData));

      /** ADDED BY JAMES */
      //dispatch(setServiceName(selectServiceName));
      //dispatch(setServiceNameEN(selectServiceNameEN));
      localStorage.setItem("currentService", selectData);
      localStorage.setItem("currentServiceName", selectServiceName);
      localStorage.setItem("currentServiceNameEN", selectServiceNameEN);

      navigate("/form");
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Select Service
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSelectSubmit}>
        <select
          id="service"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90">
          Select
        </button>
      </form>
      <p className="text-red-700 mt-4">
        {selectError ? "Please select a service." : ""}
      </p>
    </div>
  );
};

export default Service;
