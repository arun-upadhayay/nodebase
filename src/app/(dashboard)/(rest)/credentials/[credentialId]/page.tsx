import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { credentialId } = await params;
        await requireAuth();

  return (
    <div>
      <h1>credentila id: {credentialId}</h1>
    </div>
  );
};

export default Page;
