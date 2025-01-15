interface NewsItemProps {
  title: string;
  subtitle: string;
  img: string;
}

function NewsItem({ title, subtitle, img }: NewsItemProps) {
  return (
    <div className="post-item clearfix">
      <img src={img} alt=""/>
      <h4>
        <a href="#">{title}</a>
      </h4>
      <p>{subtitle}</p>
    </div>
  );
}

export default NewsItem;