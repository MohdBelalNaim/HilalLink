import { loginUser } from "@/redux/userSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loginUser());
      navigate("/home");
    }
  }, [dispatch, navigate]);

  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);

  const handleGoogleLoginSuccess = async (credentialResponse) => {

  const detail = jwtDecode(credentialResponse.credential);
  const name = detail.given_name + " " + detail.family_name;
  const accessId = detail.email;
  const photo = detail.picture;

  fetch(`${base}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, accessId ,photo}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/")
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id)
          dispatch(loginUser());
          navigate("/home");
        }
      })
      .catch((err) => console.log(err))
    }

  function userLogin(data) {
    setLoading(true);
    fetch(`${base}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "Email is not verified") {
            localStorage.setItem("accessId", data.accessId);
            navigate("/signup/verification");
            toast.error("Please verify the email");
          } else {
            toast.error(data.error);
          }
          setLoading(false);
        } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        dispatch(loginUser());
        navigate("/home");
      }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="max-sm:p-3 max-sm:h-[100dvh] container mx-auto grid grid-cols-[1fr,1fr] max-sm:grid-cols-1">
      <div className="h-[100dvh] max-sm:h-max flex items-center">
        <div className="">
          <div className="font-medium text-4xl max-sm:text-2xl max-sm:mt-5">
            Welcome to <span className="primary">HilalLink</span>
          </div>
          <div className="text-xl w-[min(600px,98%)] mt-4 mb-8 max-sm:text-sm">
            Where Muslims unite! Sign up now to explore our diverse community
            and inspiring content.
          </div>
          <div>
            <div className="py-4 font-medium max-sm:hidden">
              Recent login accounts
            </div>
            <div className="grid grid-cols-4 gap-3 max-sm:hidden">
              {"abcd".split("").map((item, index) => {
                return (
                  <div className="bg-white flex flex-col items-center rounded-md border p-4" key={index}>
                    <img
                      src={`https://picsum.photos/400?${index}`}
                      className="size-20 rounded-full"
                      alt=""
                    />
                    <div className="font-medium text-sm mt-4">Sajad Khaki</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100dvh] max-sm:h-max flex items-center justify-center max-sm:items-start">
        <div className="bg-white py-6 max-sm:px-4 px-8 w-[min(400px,98%)]  rounded-md border grid gap-y-5">
          <form
            action=""
            className=" grid gap-y-5"
            onSubmit={handleSubmit(userLogin)}
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2.5 border rounded max-sm:text-sm"
              required
              {...register("accessId")}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2.5 border rounded max-sm:text-sm"
              required
              {...register("password")}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-2 max-sm:text-xs">
                <input type="checkbox" name="" id="" />
                Remember me
              </div>
              <Link to={"/forgotPassword"}><div className=" max-sm:text-xs">Forgot Password?</div></Link> 
            </div>
            <button
              disabled={loading}
              className={`py-2.5 text-sm rounded-full ${
                loading ? "bg-blue-200" : "bg-primary"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          
          <div className="py-2.5 gap-2 text-sm rounded-full flex items-center justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
            }}
          />
          </div>

          <div className="flex  items-center gap-3">
            <div className="w-full h-[0.7px] bg-gray-300"></div>
            <div>or</div>
            <div className="w-full h-[0.7px] bg-gray-300"></div>
          </div>
          <Link to="/signup ">
            <button className="py-2.5 text-sm rounded-full bg-accent w-full">
              Create a new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

