import { useDispatch } from "react-redux";
import { orderBy } from "../redux/actions/actions";
import { A_Z, Z_A, WEIGHT_MAX, WEIGHT_MIN } from "../const/const_order";
import "../styles/order.css";

export default function Order() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(orderBy(e.target.value));
  }

  return (
    <div>
      <select onChange={onSelectChange} className="select">
        <option defaultValue>Order By</option>
        <option value={A_Z}>Order A - Z</option>
        <option value={Z_A}>Order Z - A</option>
        <option value={WEIGHT_MAX}>Weight Max</option>
        <option value={WEIGHT_MIN}>Weight Min</option>
      </select>
    </div>
  );
}
