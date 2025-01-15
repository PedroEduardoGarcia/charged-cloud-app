import NewsItem from "./NewsItem";
import placeholderImg from '../../../assets/vite.svg';
import placeholderImg2 from '../../../assets/react.svg';

function News() {
  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title">
          Notícias &amp; Novidades <span>| Hoje</span>
        </h5>

        <div className="news">
          <NewsItem 
            title="Esse é o título de uma notícia"
            subtitle="Este é o subtítulo de uma nptícia, com uma breve descrição sobre o que ela trata."
            img={placeholderImg}
          />
        </div>

        <div className="news">
          <NewsItem 
            title="Esse é o título de uma notícia"
            subtitle="Este é o subtítulo de uma nptícia, com uma breve descrição sobre o que ela trata."
            img={placeholderImg2}
          />
        </div>

        <div className="news">
          <NewsItem 
            title="Esse é o título de uma notícia"
            subtitle="Este é o subtítulo de uma nptícia, com uma breve descrição sobre o que ela trata."
            img={placeholderImg}
          />
        </div>
      </div>
    </div>
  );
}

export default News;