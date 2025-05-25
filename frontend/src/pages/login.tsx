import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, "email@example.com", "password");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithEmail}>Login with Email</button>
    </div>
  );
}
