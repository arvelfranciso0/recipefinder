import { getUserVerificationLastUseActiveById } from "@/repository/user_verification";
import ResetPassword from "./reset-password-form";
import InvalidLinkPage from "./invalid";

export default async function ForgotPasswordVerifyPage(
  props: PageProps<"/forgot/[id]">,
) {
  const { id } = await props.params;

  const verification = await getUserVerificationLastUseActiveById(id);

  if (!verification) {
    return <InvalidLinkPage />;
  }

  return <ResetPassword id={id} />;
}
