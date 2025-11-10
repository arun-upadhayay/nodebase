import { requireAuth } from "@/lib/auth-utils";


const Page = async () => {
    await requireAuth();
    return (
<p>worflskmflasx</p>
    )
}

export default Page