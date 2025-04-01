import DownloadableImageCard from "../shared/DownloadableImgCard";

const AdmitAndIdentityCard = () => {
  return (
    <>
      <DownloadableImageCard
        title="admit card"
        imgUrl="admitcard.img"
        isDisabled={true} // depend on admit image (url)
      />
      <DownloadableImageCard
        title="identity card"
        imgUrl="identitycard.img"
        isDisabled={true} // depend on identity image (url)
      />
    </>
  );
};

export default AdmitAndIdentityCard;
