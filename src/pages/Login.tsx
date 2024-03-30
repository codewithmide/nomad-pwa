import Navigation from "../components/Navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Logo from "../components/common/Logo";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Login = () => {
    const { primaryWallet, user } = useDynamicContext();
  
    if (primaryWallet !== null || user) {
      return (
        <div >
          <Navigation />
        </div>
      );
    } else {
      return (
        <main className="h-screen w-screen flex-col between bg-black p-4 text-white">
          <div className="w-full flex items-start"><Logo /></div>
          <div className="center flex-col gap-4">
            <h2 className="text-lg font-regular text-center ">Please create an account or login to continue</h2>
            <DynamicWidget innerButtonComponent={<button>Login to nomad</button>} />
          </div>
          <div></div>
        </main>
      )
    }
  }
  