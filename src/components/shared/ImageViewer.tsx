interface IImageProps {
  srcUrl: string;
  altText: string;
}

function ImageViewer({ altText, srcUrl }: IImageProps) {
  return (
    <div className="w-28 h-28 rounded-full bg-secondary overflow-hidden mx-auto mt-3">
      <img
        src={srcUrl}
        alt={altText || "image container"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ImageViewer;
