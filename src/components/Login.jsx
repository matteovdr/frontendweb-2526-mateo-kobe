import { CgProfile } from "react-icons/cg";

function Login() {
  return (
    <>
      <div id="container" className="flex justify-center bg-blue-100">
        <div id="loginScherm" className="flex justify-center items-center flex-col align-middle border-6 m-15
        border-blue-300 rounded-4xl p-7 w-2xl">
          <CgProfile className="text-6xl md:text-8xl text-blue-300"/>
          <h1 className="font-bold text-4xl md:text-6xl text-blue-500 mb-6">Login</h1>
          <input placeholder="email/naam" className="p-3 w-88 bg-blue-50 rounded-2xl mb-4"/>
          {/* copy voor ww wanneer ^^^^ klaar is*/}
        </div>
      </div>
    </>
  );
};

export default Login;