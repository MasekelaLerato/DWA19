import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

// Supabase configuration
const supabaseUrl = "https://qpqidrvpikiaelnmngcc.supabase.co";
const supabaseKey = "YOUR_SUPABASE_KEY"; // Replace with your actual Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Save the subscription to an instance variable
    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in:", session.user);
          const red = session.user.email.split("@")[0].toUpperCase();
          console.log("AIIINT NO ", red);

          // Display the red constant in the h2 element
          const welcomeMessage = document.getElementById("welcomeMessage");
          if (welcomeMessage) {
            welcomeMessage.innerText = `Welcome, ${red}`;
          }

          navigate("/dashboard");
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          navigate("/");
        }
      },
      []
    );

    // Cleanup the authListener subscription on component unmount
    return () => {
      // Check if the `authListener` has the `unsubscribe` method before calling it
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div>
      <header>
        {/* Supabase Auth component */}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="day"
          socialLayout="horizontal"
          socialButtonSize="large"
        />
      </header>
    </div>
  );
}

export default LoginPage;
