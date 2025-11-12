import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "idle") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigation.state]);

  return null;
}

export default ScrollToTop;
