import { verifyEmail } from "@/lib/services/verifyEmailService";

type Props = {
  params: Promise<{ token: string }>;
};
//TODO: Nav3echny page bych m2l m9t metadata
export default async function VerifyEmailToken({ params }: Props) {
  const { token } = await params;
  debugger;
  const verificationResult = await verifyEmail(token);

  return <h1>{token}</h1>;
}
