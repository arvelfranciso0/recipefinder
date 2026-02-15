import { Loader2 } from "lucide-react";

export default function SubmitAnimation() {
  return (
    <>
      <div className="flex items-center ml-2">
        <span className="inline-flex w-8 text-left ml-1">
          <span className="animate-[bounce_1.4s_infinite_0ms]">.</span>
          <span className="animate-[bounce_1.4s_infinite_200ms]">.</span>
          <span className="animate-[bounce_1.4s_infinite_400ms]">.</span>
        </span>
      </div>
    </>
  );
}
