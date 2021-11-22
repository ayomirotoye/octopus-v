import React, { useMemo, useState } from "react";
import { dashboardSummaryTexts } from "../../common/constants";
import InformationCard from "../../components/InformationCard";

const Dashboard = () => {
  const [myInfoCards, setMyInfoCards] = useState(Object.assign([]));

  useMemo(() => {
    let infoCards = [];
    for (const [keys, values] of Object.entries(dashboardSummaryTexts)) {
      let newInfo = (
        <InformationCard amount_value="NGN 25.00" percentage="25%" title={values} />
      );
      infoCards.push(newInfo);
    }
    setMyInfoCards(infoCards);
  }, []);

  return (
    <div>
      <div className="row">{myInfoCards}</div>
    </div>
  );
};

export default Dashboard;
