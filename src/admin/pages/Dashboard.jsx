const cards = [
  ['Earnings (Monthly)', '$40,000', 'fas fa-calendar', 'primary'],
  ['Earnings (Annual)', '$215,000', 'fas fa-dollar-sign', 'success'],
  ['Tasks', '50%', 'fas fa-clipboard-list', 'info'],
  ['Pending Requests', '18', 'fas fa-comments', 'warning'],
]

export default function Dashboard() {
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" type="button"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</button>
      </div>

      <div className="row">
        {cards.map(([label, value, icon, tone]) => (
          <div className="col-xl-3 col-md-6 mb-4" key={label}>
            <div className={`card border-left-${tone} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${tone} text-uppercase mb-1`}>{label}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
                  </div>
                  <div className="col-auto"><i className={`${icon} fa-2x text-gray-300`} /></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between"><h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6><i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" /></div>
            <div className="card-body">
              <div className="chart-placeholder"><div className="chart-line" /><span>Analytics chart area</span></div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3"><h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6></div>
            <div className="card-body">
              <div className="donut-placeholder"><div className="donut-center">100%</div></div>
              <div className="mt-4 text-center small"><span className="mr-2"><i className="fas fa-circle text-primary" /> Direct</span><span className="mr-2"><i className="fas fa-circle text-success" /> Social</span><span><i className="fas fa-circle text-info" /> Referral</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
