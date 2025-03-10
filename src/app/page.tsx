"use client";
import { InsurancePlans } from "./components/InsurancePlans";
import { InsuranceSubmissions } from "./components/InsuranceSubmissions";

const Home = () => {
  return (
    <>
      <InsurancePlans />
      <InsuranceSubmissions />
    </>
  );
};

export default Home;
