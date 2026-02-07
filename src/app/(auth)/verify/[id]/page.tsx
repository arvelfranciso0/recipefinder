import { db } from "@/db";
import VerificationForm from "../_components/verification";
import { userVerifications } from "@/db/schema";
import { and, eq, gt, isNull } from "drizzle-orm";
import InvalidVerificationPage from "../_components/failed-verification";

export default async function VerificationPage(
  props: PageProps<"/verify/[id]">,
) {
  const { id } = await props.params;
  const now = new Date();
  const verification = await db
    .select({
      id: userVerifications.id,
      expireAt: userVerifications.verificationExpiresAt,
    })
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.id, id),
        gt(userVerifications.verificationExpiresAt, now),
        isNull(userVerifications.lastUsedAt),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  if ((!verification || verification.length) === 0) {
    return (
      <InvalidVerificationPage
        showRequestLink={false}
        message={`This verification link is no longer available!`}
      />
    );
  }
  return <VerificationForm tokenId={id} />;
}
