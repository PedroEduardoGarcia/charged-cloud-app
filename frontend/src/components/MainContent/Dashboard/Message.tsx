
interface MessageProps {
  title: string;
  subTitle: string;
  text: string;
  subText?: string[];
}

function Message({ title, subTitle, text, subText }: MessageProps) {

  return (
      <div className="card overflow-auto">
        <div className="card-body">
          <h5 className="card-title">{title}: <span>{subTitle}</span></h5>
          <p className="card-text">{text}</p>
          {subText && subText.length > 0 && (
          
            subText.map((item, index) => (
              <p key={index} className="card-text">
                {item}
              </p>)
            ))}
        </div>
      </div>
  );
}

export default Message;