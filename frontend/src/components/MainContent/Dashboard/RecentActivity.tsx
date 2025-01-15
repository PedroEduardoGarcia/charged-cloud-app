import RecentActivityItem from "./RecentActivityItem ";

function RecentActivity() {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Atividade Recente</h5>
        <div className="activity">
          <RecentActivityItem
            label="Label"
            badgeColor="success"
            highlight="Highlight"
            content="Conteúdo do item"
          />
          <RecentActivityItem
            label="Label"
            badgeColor="info"
            highlight="Highlight"
            content="Conteúdo do item"
          />
          <RecentActivityItem
            label="Label"
            badgeColor="warning"
            highlight="Highlight"
            content="Conteúdo do item"
          />
          <RecentActivityItem
            label="Label"
            badgeColor="danger"
            highlight="Highlight"
            content="Conteúdo do item"
          />
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;