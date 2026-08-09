import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "https://libportal.swu.ac.th/feedback/rating";

const Result = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [total, setTotal] = useState([]);
  const [service, setService] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getTotal = async () => {
      await axios
        .get(`${baseURL}/all`)
        .then((response) => {
          setTotal(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const getService = async () => {
      await axios
        .get(`${baseURL}/service`)
        .then((response) => {
          const serviceItems = response.data.sort((a, b) => b.count - a.count);
          setService(serviceItems);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const getUser = async () => {
      await axios
        .get(`${baseURL}/user`)
        .then((response) => {
          const userItems = response.data.sort((a, b) => b.count - a.count);
          setUser(userItems);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    if (!currentUser) {
      navigate("/sign-in");
    } else {
      getTotal();
      getService();
      getUser();
    }
  }, []);

  console.log(total);
  console.log(service);
  console.log(user);
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center mt-10">
        <h2 className="mt-5 text-4xl font-bold  text-gray-600">
          Total results
        </h2>
      </div>

      <div className="bg-white py-5 mt-5">
        <div className="mx-auto max-w-7xl px-6">
          <dl className="text-center">
            {total.map((stat) => (
              <div
                key={stat.fullname}
                className="mx-auto flex max-w-xs flex-col"
              >
                <dt className="text-base leading-7 text-gray-600">
                  Count: {stat.count} | Score: {stat.score}
                </dt>
                <dd className="order-first text-7xl font-semibold tracking-tight text-gray-900">
                  {stat.average}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-2xl text-center mt-24">
        <h2 className="mt-5 text-4xl font-bold  text-gray-600">Service</h2>
      </div>

      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {service.map((serviceItem) => (
              <div
                key={serviceItem.fullname}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-600">
                  {serviceItem.fullname}
                </dt>
                <dt className="text-base leading-7 text-gray-600">
                  Count: {serviceItem.count} | Score: {serviceItem.score}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {serviceItem.average}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      {/** 
      <div className="mx-auto max-w-2xl text-center mt-24">
        <h2 className="mt-5 text-4xl font-bold  text-gray-600">Staff</h2>
      </div>

      
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5">
            {user.map((userItem) => (
              <div
                key={userItem.fullname}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-600">
                  {userItem.fullname}
                </dt>
                <dt className="text-base leading-7 text-gray-600">
                  Count: {userItem.count} | Score: {userItem.score}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {userItem.average}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      */}
    </div>
  );
};

export default Result;
