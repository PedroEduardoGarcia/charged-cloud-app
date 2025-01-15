import Overview from "./Overview";
import Message from "./Message";
import RecentActivity from "./RecentActivity";
import News from "./News";

function Dashboard() {
  return (
    <section className='dashboard section'>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='row'>
            <Overview
              title="Empresas"
              subtitle="Ativas"
              iconClass="bi bi-journal-text"
              mainText="Contratos"
              value="999"
              additionalText="contratos abertos"
              cardVariant="first-card"
            />
            <Overview
              title="Tarefas"
              subtitle="Abertas"
              iconClass="bi bi-gear"
              mainText="Porcentagem"
              value="99%"
              additionalText="tarefas completas"
              cardVariant="second-card"
            />
            <Overview
              title="Alertas"
              subtitle="Pendentes"
              iconClass="bi bi-exclamation-circle"
              mainText="Atenção"
              value="9"
              additionalText="em aberto"
              cardVariant="third-card"
            />
            <div className="col-12">
              <Message title="Sistema Online & Offline" subTitle="" text="O feature on/off infere a conexão com a API e o servidor a cada 10 segundos. O ícone na barra de navegação, verde e vermelho, indicam se o backend está ou não online."/> 
            </div>
            <div className="col-12">
              <Message title="Mensagens" subTitle="3 novas mensagens" text="Você parece ter mensaagens não lidas" subText={['Clique no ícone de sino para verificar suas mensagens']}/> 
            </div>
            <div className="col-12">
              <Message title="Update" subTitle="v0.1" text="Versão 0.1 está ao vivo! Obrigado por suar nosso sistema."/>
            </div>
            <div className="col-12">
              <Message title="Update" subTitle="v0.1" text="Versão 0.1 está ao vivo! Obrigado por suar nosso sistema."/>
            </div>
            <div className="col-12">
              <Message title="Update" subTitle="v0.1" text="Versão 0.1 está ao vivo! Obrigado por suar nosso sistema."/>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <RecentActivity />
          <News />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;