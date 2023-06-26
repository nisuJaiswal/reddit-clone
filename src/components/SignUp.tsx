import Link from "next/link";
import Icon from "./Icon";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
  return (
    <div className="container flex flex-col sm:w-[400px] w-full space-y-6 justify-center">
      <div className="flex flex-col space-y-2 text-center">
        <Icon.logo className="w-6 h-6 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="max-w-sm text-sm mx-auto">
          By Continuing, you are setting up a breaddit account and agree to our
          user agreement and privacy policy
        </p>

        {/* Sign in form */}
        <UserAuthForm />

        <p className="px-8 text-zinc-700 text-sm text-center">
          Already a Breaddit User?
          <Link
            href="/sign-in"
            className="hover:text-blue-800 underline text-sm font-semibold underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
