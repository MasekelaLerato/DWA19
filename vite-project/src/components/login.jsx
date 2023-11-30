import  { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://xphfzbgkfnddjxmlmnfv.supabase.co";
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGZ6YmdrZm5kZGp4bWxtbmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzOTMwNDgsImV4cCI6MjAxNTk2OTA0OH0.hwYLwkvNuxnBGRnnHBN9v3LwaILv-cMHIaAiLCE7ruM"

  
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

    // Clean up the listener when the component unmounts
    return () => {
      // Check if the `authListener` has the `unsubscribe` method before calling it
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, [navigate]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     // Optionally, you can perform additional actions after the user is signed out
//     console.log("User signed out");
//     navigate("/");
//   };

  return (
    <div>
      <header>
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