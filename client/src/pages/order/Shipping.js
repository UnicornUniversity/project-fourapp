import PaymentForm from "../../containers/order/PaymentForm"
import ShippingForm from "../../containers/order/ShippingForm"
import Card from "../../components/card/Card"
import { useNavigate } from "react-router-dom"

export function Shipping(){
    const navigate = useNavigate()
    return (
        <div>

            <ShippingForm/>

        </div>
    )
}