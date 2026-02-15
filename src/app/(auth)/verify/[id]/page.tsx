import VerificationForm from "../_components/verification";
import InvalidVerificationPage from "../_components/failed-verification";
import { getUserVerificationLastUseActiveById } from "@/repository/user_verification";

export default async function VerificationPage(
  props: PageProps<"/verify/[id]">,
) {
  const { id } = await props.params;
  const verification = await getUserVerificationLastUseActiveById(id);

  if (!verification) {
    return (
      <InvalidVerificationPage
        message={`This verification link is no longer available!`}
      />
    );
  }
  return (
    <VerificationForm tokenId={id} resendAt={verification.resetCodeTime} />
  );
}
