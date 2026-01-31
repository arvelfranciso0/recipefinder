"use client";

import Link from "next/link";
import { Eye, Lock, Mail, User } from "lucide-react";
import { ChefHat } from "@/components/icons/chef-hat";

import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/ui/input";
import { useState } from "react";
import useForm from "@/hooks/useForm";
import { signupFormDefaultValue, signUpSchema } from "@/schemas/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function SignUpPage() {
  const [check, setCheck] = useState(false);
  const { values, handleSubmit, handleChange, errors } = useForm(
    signupFormDefaultValue,
    signUpSchema,
  );

  const handleSignup = async () => {
    await axios
      .post("/api/auth/sign-up", values)
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((error: AxiosError) => {
        console.log("Internal server error.");
      });
  };
  return (
    <div className="min-h-screen flex">
      {/* --- Left Hero Section --- */}
      <section className="hidden md:flex md:w-1/2 lg:w-[55%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCza3cqistU_j7B4jnlb7RKKWOnH_GkrvbR3n89SZq0QPE6KWPGgVsSNk_s1sXy665F5UU89EuAmG_zXq2HJHQl66eiyL2r_UR2aGQ-OpH68uMWdeJ87M-FdTFqk-SSC_EuXOucnSof49FjCDo_NNJiYLPNJSU2j6xrvOGT7GztC4_oTct_RDEiDj-gCjwym3Qd9Wvu2fRKB96dIixJl3yUOtgsgFs8xBQcoPpGnDxkUEAmZL8Amzl659VvDM31Y3jwGU_dL8rMXp1S')",
          }}
        >
          {/* Subtle overlay to make text pop on the light-themed image */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 p-12 mt-auto text-white">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ChefHat />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </div>

          <h2 className="text-5xl font-black leading-tight mb-4 text-white">
            Start your culinary <br />
            <span className="text-primary italic">adventure</span> today.
          </h2>
          <p className="text-lg text-white/90 max-w-md font-medium">
            Join over 15,000 food lovers and access thousands of hand-picked
            recipes from around the world.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  alt={`User ${i}`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src={`https://i.pravatar.cc/150?u=${i}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold">Join 15k+ home chefs</span>
          </div>
        </div>
      </section>

      {/* --- Right Form Section --- */}
      <section className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 ">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 mb-12">
          <ChefHat />
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">
            Recipe<span className="text-primary">Finder</span>
          </h1>
        </div>

        <div className="max-w-md w-full mx-auto">
          <header className="mb-10">
            <h3 className="text-3xl font-black text-foreground mb-2">
              Create an Account
            </h3>
            <p className="text-muted font-medium">
              Welcome to the family! Tell us a bit about yourself.
            </p>
          </header>

          {/* Social Sign Up */}
          {/* <div className="grid grid-cols-2 gap-4 mb-8">
            <SocialButton provider={"Google"} />
            <SocialButton provider={"Facebook"} />
          </div> */}

          <div className="relative flex items-center mb-8">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-xs font-bold text-muted/60 uppercase tracking-widest">
              or email signup
            </span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleSignup)}>
            <div>
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <InputField
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Chef Gusteau"
                icon={User}
                className="w-full"
                value={values.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.fullname}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="gusteau@recipefinder.com"
                icon={Mail}
                className="w-full"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-3 pl-2">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                  <Lock />
                </span>
                <InputField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                  value={values.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <Eye />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                className="cursor-pointer"
                onCheckedChange={() => setCheck(true)}
                checked={check}
              >
                <label
                  className="text-xs cursor-pointer  font-semibold text-muted"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <Link className="text-primary hover:underline" href="/terms">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-primary hover:underline"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </Checkbox>
            </div>

            <Button
              type="submit"
              className=" w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] mt-4"
            >
              Join the Kitchen
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-semibold text-muted">
              Already have an account?
              <Link
                className="text-primary hover:underline font-bold ml-1"
                href="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-auto pt-10 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted/50">
          <Link className="hover:text-primary transition-colors" href="#">
            Help Center
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Safety
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Contact
          </Link>
        </footer>
      </section>
    </div>
  );
}
