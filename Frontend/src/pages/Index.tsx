import { useEffect } from "react";
import "../i18n/i18n";
import Product from "./Product";

const Index = () => {
  useEffect(() => {
    document.title = "Farm Fresh Product Hub";
  }, []);

  return <Product />;
};

export default Index;