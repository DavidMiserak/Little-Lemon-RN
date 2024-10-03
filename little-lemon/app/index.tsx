import { useState, useEffect } from "react";
import { Redirect, router } from "expo-router";
import { getUser } from "../user";


function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser().then((user) => {
      const hasFirstName = user.firstName.length > 0;
      const hasEmail = user.email.length > 0;

      if (hasFirstName && hasEmail) {
        setIsLoggedIn(true);
        router.push("/menu");
      }
    });
  }, []);


  return (
    !isLoggedIn ? <Redirect href="/onboarding" /> : <Redirect href="/menu" />
  );
}

export default Index;
