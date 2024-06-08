import React, {useState,useEffect} from "react";
import logo from "../../assets/images/logo.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

const Bio = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const base = useSelector((state) => state.userSlice.base_url);

  useEffect(() => {
    const accessId = localStorage.getItem("accessId");
    const address= localStorage.getItem("address");
    const verification = localStorage.getItem("verification");
    const storedName = localStorage.getItem("name");
    if(!accessId){
      navigate("/signup");
    }
    if(!address){
      navigate("/signup/address");
    }
    if(!verification){
      navigate("/signup/verification");
    }
    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);


  const onSubmit = (data) => {
    setLoading(true);
    const { bio } = data;
    const accessId = localStorage.getItem("accessId");

    fetch(`${base}/signup/bio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, accessId: accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("bio","1")
          navigate("/signup/photo");
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const Movetophoto = () =>{
    localStorage.setItem("bio","1")
    navigate("/signup/photo");
  }

  return (
    <div className="max-sm:p-2 h-[100dvh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center py-6">
          <img src={logo} className="size-10 rounded-full" alt="" />
        </div>
        <div className="w-[min(460px,98%)] mx-auto pt-6 mb-6">
          <div className="text-2xl font-medium max-sm:text-lg text-center">
            Salam {name}
          </div>
          <div className="text-sm mt-5 max-sm:hidden">
            Welcome to HilalLink:
          </div>
          <div className="text-sm mt-1 max-sm:hidden">
            Your Gateway to a Global Muslim Community.
          </div>
        </div>

        <div className="w-[min(460px,98%)] grid gap-y-4 p-6 bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
          <label className="text-sm">Bio / About yourself</label>
          <textarea
            {...register("bio")}
            rows="6"
            className="border rounded p-2 w-full mt-1"
          ></textarea>
          
          <button
              disabled={loading}
              className={`py-2.5 text-sm rounded-full ${
                loading ? "bg-blue-200" : "bg-primary"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Continue"
              )}
          </button>
          <button onClick={()=>(Movetophoto())}  className="text-center text-sm ">Skip & continue</button>
        </div>
      </form>
    </div>
  );
};

export default Bio;
