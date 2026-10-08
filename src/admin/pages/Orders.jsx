const orders = [
  ['#1024', 'Customer One', 'Completed', '$420'],
  ['#1025', 'Customer Two', 'Pending', '$185'],
  ['#1026', 'Customer Three', 'Processing', '$760'],
]

export default function Orders() {
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4"><h1 className="h3 mb-0 text-gray-800">Orders</h1><button className="btn btn-primary btn-sm" type="button"><i className="fas fa-plus fa-sm mr-1" /> New Order</button></div>
      <div className="card shadow mb-4">
        <div className="card-header py-3"><h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6></div>
        <div className="card-body"><div className="table-responsive"><table className="table table-bordered" width="100%"><thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th></tr></thead><tbody>{orders.map((order) => <tr key={order[0]}>{order.map((cell, index) => <td key={`${order[0]}-${index}`}>{index === 2 ? <span className="badge badge-light">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div></div>
      </div>
    </>
  )
}
