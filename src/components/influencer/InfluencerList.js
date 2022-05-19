import React from "react";
// import { useDialog } from "../../hooks/DialogHook";

import InfluencerListItem from "./InfluencerListItem";

const InfluencerList = ({
  influencers,
  deleteInfluencersState,
  updateInfluencersState,
}) => {
  return (
    <div>
      {influencers &&
        influencers.docs.map((influencer) => {
          return (
            <InfluencerListItem
              key={influencer._id}
              influencer={influencer}
              deleteInfluencersState={deleteInfluencersState}
              updateInfluencersState={updateInfluencersState}
            />
          );
        })}
    </div>
  );
};

export default InfluencerList;
