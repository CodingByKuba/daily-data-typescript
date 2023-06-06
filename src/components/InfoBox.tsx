import { InfoBoxType } from "../data/types";

const InfoBox = (props: InfoBoxType) => {
  const { message, type } = props;
  return (
    <div id="info-box" className={"info-" + type}>
      {message}
    </div>
  );
};

export default InfoBox;
