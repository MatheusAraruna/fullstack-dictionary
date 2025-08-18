import { signout } from "../../../utils/token";

export function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <button type="button" onClick={() => signout()}>Logout</button>
        </div>
    )
}