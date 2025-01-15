interface OverviewProps {
  title: string;
  subtitle: string;
  iconClass: string;
  mainText: string;
  value: string;
  additionalText: string;
  cardVariant: string;
}

function Overview({ title, subtitle, iconClass, mainText, value, additionalText, cardVariant }: OverviewProps) {
  return (
    <div className="col-xxl-4 col-md-6">
    <div className={`card info-card ${cardVariant}`}>
      <div className="card-body">
        <h5 className="card-title">
          {title}<span> | {subtitle}</span>
        </h5>
        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={iconClass}></i>
          </div>
          <div className="ps-3">
            <h6>{mainText}</h6>
            <span className="text-danger small pt-1 fw-bold">{value}</span>
            <span className="text-muted small pt-2 ps-1">{additionalText}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Overview