import { redirect } from "next/navigation";
import { auth } from "./auth";

export default async function getSession() {
    const session = await auth()
    const user = session?.user;
    if (user) { return user }
    else if (!user) {
        return redirect("/login")
    }
}
