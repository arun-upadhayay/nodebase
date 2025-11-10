import { requireAuth } from "@/lib/auth-utils";


const Page = async () => {
        await requireAuth();
    
    return (
        <div className="bg-green">
            bsdk
        </div>
    )
}

export default Page