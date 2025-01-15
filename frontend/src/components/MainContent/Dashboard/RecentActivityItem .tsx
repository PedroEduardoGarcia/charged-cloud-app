interface RecentActivityItemProps {
  label: string;
  badgeColor: string;
  highlight: string;
  content: string;
}

function RecentActivityItem({ label, badgeColor, highlight, content }: RecentActivityItemProps) {
  return (
    <div className="activity-item d-flex">
      <div className="activity-label">{label}</div>
      <i className={`bi bi-circle-fill activity-badge text-${badgeColor} align-self-start`}></i>
      <div className="activity-content">
        <a href="#" className="fw-bold text-dark">
          {highlight}
        </a>
      </div>
      <div className="activity-content">
        {content}
      </div>
    </div>
  );
}

export default RecentActivityItem;