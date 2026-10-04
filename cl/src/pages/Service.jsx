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
      label: "ประสานมิตร - ยืม - คืน ทรัพยากร",
      value: "cl-circulation",
      name: "การใช้บริการยืม - คืน ทรัพยากร",
      name_en: "for Circulation Service",

    },
    {
      label: "ประสานมิตร - บริการบอร์ดเกม",
      value: "cl-boardgame",
      name: "การใช้บริการบอร์ดเกม",
      name_en: "for Board Games Service",
    },
    {
      label: "ประสานมิตร - บริการช่วยค้นคว้า",
      value: "cl-infomation",
      name: "การใช้บริการช่วยค้นคว้า",
      name_en: "for Information Service",
    },
    {
      label: "ประสานมิตร - บริการชมภาพยนตร์",
      value: "cl-netflix",
      name: "การใช้บริการชมภาพยนตร์",
      name_en: "for Movie Service",
    },
    {
      label: "ประสานมิตร - บริการอื่นๆ",
      value: "cl-other",
      name: "การใช้บริการห้องสมุด",
      name_en: "for Overall Service",
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
     // dispatch(setServiceName(selectServiceName));
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
