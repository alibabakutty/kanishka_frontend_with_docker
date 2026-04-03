import Home from "../components/Home";
import Login from "../components/login/LoginPage";
import PurchaseOrder from "../components/purchase_order/PurchaseOrder";

const routeConfig = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/purchase_order', element: <PurchaseOrder /> }
];

export default routeConfig;